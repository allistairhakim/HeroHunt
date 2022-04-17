class player:
  def __init__(self, name):
    self.points = 0
    self.health = 1000
    self.name = name
  def dmg(self, amt):
    self.health -= amt
    return self.health
  def decreasePoints(self, amt):
    self.points -= amt
    return self.points