with open("2025\puzzleInput\inputDec2.txt", 'r') as f:
  line = f.readline().strip()
  ranges = line.split(",")

invalidIds = []


for rangeids in ranges:
  ids = rangeids.split("-")
  
  for id in range(int(ids[0]), int(ids[1]) + 1):
    idString = str(id)
    #print(idString)
    l = len(idString)
    p1 = idString[0:int(l / 2)]
    p2 = idString[int(l / 2):]  
    
    #print(p1, p2)
    if p1 == p2:
      print("Id is invalid:", id)
      invalidIds.append(id)
    
total = 0
for invalidId in invalidIds:
  total += invalidId
  
print(total)
  
  
 