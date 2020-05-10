#!/usr/local/bin/python3
from os import listdir
from os.path import isfile, join

output_file = './public/us_state_data_parsed.csv';
csv_dir_path = './covid_data';

onlyfiles = [f for f in listdir(csv_dir_path) if isfile(join(csv_dir_path, f))]

states = {}
dates = []

filtered = ["Diamond Princess", "Grand Princess", "Guam",
  "Northern Mariana Islands", "Puerto Rico", "Recovered", "Virgin Islands"]

for file in onlyfiles:
  if file == '.DS_Store':
    continue

  name = file.split(".")[0]
  dates.append(name)

  with open(f"{csv_dir_path}/{file}", "r") as file:
    for line in file:
      split_line = line.split(",")
      if split_line[3] == "US":
        if split_line[2] not in filtered:
          if split_line[2] == "District of Columbia":
            if "Washington" not in states:
              states["Washington"] = {}
            if name not in states["Washington"]:
              states["Washington"][name] = int(split_line[8])
            else:
              states["Washington"][name] = states["Washington"][name] + int(split_line[8])
          else:
            if split_line[2] not in states:
              states[split_line[2]] = {}
            if name not in states[split_line[2]]:
              states[split_line[2]][name] = int(split_line[8])
            else:
              states[split_line[2]][name] = states[split_line[2]][name] + int(split_line[8])

with open(f"{output_file}", "a") as output:
  title = "state,"
  keys = []
  for key, value in states["Alabama"].items():
    keys.append(key)
    keys.sort()
  for key in keys:
    title += key + ","

  output.write(title + "\n")
  for key in sorted(states):
    output.write(key + ",")
    for key, value in sorted(states[key].items()):
      output.write(str(value) + ",")
    output.write("\n")
