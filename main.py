from threading import Lock
from flask import Flask, render_template, session, request, jsonify, \
    copy_current_request_context
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
from flask_cors import CORS, cross_origin
import json
# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = None

app = Flask('app')
CORS(app, support_credentials=True)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()

def background_thread():
    count = 0
    while True:
        socketio.sleep(10)
        count += 1
        socketio.emit('my_response',
                      {'data': 'Server generated event', 'count': count})

@app.route('/')
def create_room():
  return render_template(
		'createroom.html',  # Template file path, starting from the templates folder. 
	)	
@app.route('/receiver', methods=['POST'])
def receive():
	data = request.get_json()
	print(data['questions'])
	print(data['answers'])
	print(data['correctAnswer'])
	session['questions'] = data
	data = json.dumps(data)
	print(data)
	hexedData = str(data).encode("utf-8").hex()
	#return render_template('game.html', async_mode=socketio.async_mode, room_code='1', username='3')
	return 'https://herohunt.allistairishmae.repl.co/choose?data=' + hexedData;

@app.route('/join', methods=['GET'])
def join():
	code = request.args.get('code')
	uname = request.args.get('username')
	data = request.args.get('data')
	if data is not None:
		return render_template('game.html', async_mode=socketio.async_mode, room_code=code, username=uname, questions=data)
	else:
		return render_template('game.html', async_mode=socketio.async_mode, room_code=code, username=uname, questions="-1")

@app.route('/win')
def win():
	return render_template('win.html')

@app.route('/lose')
def lose():
	return render_template('lose.html')
	
@app.route('/choose', methods=['GET'])
def choose():
	data = request.args.get('data')
	return render_template('choose.html', questions=data)
	
@socketio.event
def my_event(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': message['data'], 'count': session['receive_count'], 'match': message['match']}, broadcast=True)

@socketio.event
def connecting(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('connect_response',
         {'data': message['data'], 'count': session['receive_count'], 'match': message['match'], 'username': message['username'], 'starting': message['starting']}, broadcast=True)

@socketio.event
def send_data(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('get_data',
         {'data': message['data'], 'match': message['match']}, broadcast=True)

@socketio.event
def attack(message):
		session['receive_count'] = session.get('receive_count', 0) + 1
		emit('health_update', {'username': message['username'], 'match': message['match'], 'damage': message['damage']}, broadcast=True)

@socketio.event
def heal(message):
		session['receive_count'] = session.get('receive_count', 0) + 1
		emit('healing', {'username': message['username'], 'match': message['match'], 'healing': message['healing']}, broadcast=True)

@socketio.event
def leave(message):
    leave_room(message['room'])
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': 'In rooms: ' + ', '.join(rooms()),
          'count': session['receive_count']})


@socketio.on('close_room')
def on_close_room(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response', {'data': 'Room ' + message['room'] + ' is closing.',
                         'count': session['receive_count']},
         to=message['room'])
    close_room(message['room'])

@socketio.event
def update_health(message):
	session['receive_count'] = session.get('receive_count', 0) + 1
	emit('health_update',
         {'data': message['data'], 'count': session['receive_count']},
         to=message['room'])

@socketio.event
def disconnect_request():
    @copy_current_request_context
    def can_disconnect():
        disconnect()

    session['receive_count'] = session.get('receive_count', 0) + 1
    # for this emit we use a callback function
    # when the callback function is invoked we know that the message has been
    # received and it is safe to disconnect
    emit('my_response',
         {'data': 'Disconnected!', 'count': session['receive_count']},
         callback=can_disconnect)

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected', request.sid)


socketio.run(app, host='0.0.0.0')
#app.run( # Starts the site
#		host='0.0.0.0',  # Establishes the host, required for repl to detect the site
#		port=8080  # Randomly select the port the machine hosts on.
#	)