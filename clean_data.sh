#!/bin/bash
cat 2008-Table1.csv | cut -d"," -f1,2,4,5,6,7,8 > 2008_new_Table1.csv
cat 2009-Table1.csv | cut -d"," -f1 > 1.csv
cat 2009-Table1.csv | cut -d"," -f2 | sed 's/"//g' > 2.csv
cat 2009-Table1.csv | cut -d"," -f4,5,6,7,8 > rest.csv
paste -d"," 1.csv 2.csv rest.csv > 2009_new_Table1.csv
sed -i 's/Score/Home\ Team,&/g' 2009_new_Table1.csv

rm 1.csv 2.csv rest.csv

cat 2010-Table1.csv | cut -d"," -f2 | cut -d" " -f1,2,3 | sed 's/"//g' > 2.csv
cat 2010-Table1.csv | cut -d"," -f1 > 1.csv
cat 2010-Table1.csv | cut -d"," -f3,4,5,6,7,8 > rest.csv
paste -d"," 1.csv 2.csv rest.csv > 2010_new_Table1.csv

rm 1.csv 2.csv rest.csv

cp 2011-Table1.csv 2011_new_Table1.csv
cp 2012-Table1.csv 2012_new_Table1.csv
cp 2013-Table1.csv 2013_new_Table1.csv


for i in {0..3}
do
	cat 201[$i]_new_Table1.csv | cut -d"," -f4 | sed 's/ //g' > 4.csv
	cat 201[$i]_new_Table1.csv | cut -d"," -f1,2,3 > 2.csv
	cat 201[$i]_new_Table1.csv | cut -d"," -f5,6,7,8 > rest.csv


	paste -d"," 2.csv 4.csv rest.csv > 201[$i]_new_Table1.csv
	rm 2.csv 4.csv rest.csv
done

for i in {0..3}
do
	sed -i '1s/ //g'  201[$i]_new_Table1.csv
done
	
for i in 8, 9
do
	sed -i '1s/ //g'  200[$i]_new_Table1.csv
done
	
