#!/bin/bash

cat 2009-Table1.csv | cut -d',' -f1 > con0
cat 2009-Table1.csv | cut -d',' -f2 | sed 's/"//g' > con1
cat 2009-Table1.csv | cut -d',' -f4,5,6,7 > con2

paste -d"," con0 con1 con2 > 2009_new_Table.csv
