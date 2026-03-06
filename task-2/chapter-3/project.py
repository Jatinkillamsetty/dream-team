import csv
import os

os.makedirs('remove_header', exist_ok=True)

for csvfile in os.listdir('.'):
    if not csvfile.endswith('.csv'):
        continue

    csvrows = []

    with open(csvfile, 'r', newline='') as file:
        csv_reader = csv.reader(file)

        for row in csv_reader:
            if csv_reader.line_num == 1:
                continue
            csvrows.append(row)

    with open(os.path.join('remove_header', csvfile), 'w', newline='') as file:
        csv_writer = csv.writer(file)

        for row in csvrows:
            csv_writer.writerow(row)