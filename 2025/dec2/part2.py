from sympy import *

with open("2025\\dec2\\input.txt", 'r') as f:
  line = f.readline().strip()
  ranges = line.split(",")

invalidIds = []


for rangeids in ranges:
  ids = rangeids.split("-")
  for id in range(int(ids[0]), int(ids[1]) + 1):
    idString = str(id)
    l = len(idString)
    
    temp = []
    temp1 = None
    match l:
      #case 1: lrngth is even and half is also an even length
      case 2 | 4 | 8 | 12:
        temp.append(idString[0:int(l / 2)])
        temp.append(idString[int(l / 2):])
      
      case 6 | 9:
        if l == 6:
          temp1 = []
          #Test first if half is the same
          temp1.append(idString[0:int(l / 2)])
          temp1.append(idString[int(l / 2):])

        temp.append(idString[0:int(l / 3)])
        temp.append(idString[int(l / 3):int(2 * l / 3)])
        temp.append(idString[int(2 * l / 3):])
      
      case 10:
        #Test if half is the same or fiths
        temp1 = []
        temp1.append(idString[0:int(l / 2)])
        temp1.append(idString[int(l / 2):])
        
        temp.append(idString[0:int(l / 5)])
        temp.append(idString[int(l / 5):int(2 * l / 5)])
        temp.append(idString[int(2 * l / 5):int(3 * l / 5)])
        temp.append(idString[int(3 * l / 5):int(4 * l / 5)])
        temp.append(idString[int(4 * l / 5):])
      
      #Length is odd
      case 3 | 5 | 7 | 11:
        for digit in range(len(idString)):
          temp.append(idString[digit:digit+1])
          
      
    if len(set(temp)) == 1:
      #print("Id is Invalid:", id)
      invalidIds.append(id)
    elif temp1 is not None and len(set(temp1)) == 1:
      #print("Id is Invalid:", id)
      invalidIds.append(id)
    
      
        
          
total = 0
for invalidId in invalidIds:
  total += invalidId
  
print(total)
