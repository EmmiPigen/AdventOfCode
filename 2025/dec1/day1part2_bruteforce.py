from itertools import cycle

with open("2025\dec1\input.txt", 'r') as f:
  lines = [line.strip() for line in f if line.strip()]
  #print(len(lines))
  
dialList = list(range(0, 100))  # Create a list representing the dial positions from 0 to 99
dialListCycle = cycle(dialList)

for i in range(50):
  next(dialListCycle)

stepList = []
stepList.append(next(dialListCycle))

for line in lines:
  dir = line[0:1]
  dist = int(line[1:])
 
 
  if dir == "R":
    for i in range(dist):
      #Going Forward
      stepList.append(dialList[(dialList.index(stepList[-1]) + 1) % 100])

         
  if dir == "L":
    for i in range(dist):
      #Going Backwards
      stepList.append(dialList[(dialList.index(stepList[-1]) - 1) % 100])


count = 0
for i in range(len(stepList)):
  num = stepList[i]
  if num == 0:
    count += 1

print(count)