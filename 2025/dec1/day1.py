#Part 1
n = 100
def circular_index(index, step):
  return (index + step + n) % n


with open("2025\dec1\input.txt", 'r') as f:
  lines = [line.strip() for line in f if line.strip()]
  #print(len(lines))

loc = 50
counter = 0
i = 1
for line in lines:
  dir = line[0:1]
  dist = int(line[1:])
  if dir == "R":
    loc = circular_index(loc, dist)
  if dir == "L":
    loc = circular_index(loc, -dist)
  #print(i, dir, dist, loc)
  i = i + 1
  
  if loc == 0:
    counter = counter + 1

print(counter)

#Part 2
n = 100
def circular_index_rollover_counter(index, step):
  #Moves the index by step in a circular array of size n, wrapping around as needed
  #Also counts how many times we pass index 0
  hits = 0
  new_index = (index + step + n) % n # New index after movement
  print("New index: ", new_index)
  
  total_steps = abs(step) # Total steps taken
  print("Total steps: ", total_steps)
  if step >= 0:
    first_hit = (-index) % n # Steps to first hit of index 0
    print("First hit at step: ", first_hit)
  elif step < 0:
    first_hit = index # Steps to first hit of index 0
    print("First hit at step: ", first_hit)
  
  if 1 <= first_hit <= total_steps: # We hit index 0 at least once account for when we land exactly on 0
    hits = 1 + (total_steps - first_hit) // n # Count additional hits after the first
    print("Hits counted: ", hits)

  return new_index, hits


with open("2025\dec1\input.txt", 'r') as f:
  lines = [line.strip() for line in f if line.strip()]

loc2 = 50
counter2 = 0
i = 1

for line in lines:
  dir = line[0:1]
  dist = int(line[1:])
  if dir == "R":
    step = dist
  if dir == "L":
    step = -dist
  
  loc2, hits = circular_index_rollover_counter(loc2, step)
  counter2 += hits
  
  if loc2 == 0:
    counter2 += 1
  print(i, dir, dist, " loc: ", loc2, " Count: ", hits, " Counter: ", counter2)
  i += 1

print(counter2)

