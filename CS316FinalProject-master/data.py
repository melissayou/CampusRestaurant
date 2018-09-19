# -*- coding: utf-8 -*-

import psycopg2
import xml.etree.ElementTree as ET
#import re

import codecs
target_file = codecs.open("./offerings.xml",mode='r',encoding='ascii', errors="ignore")
tree= ET.parse( target_file )
#tree = ET.parse('offerings.xml', ET.XMLParser(encoding='utf-8'))
root = tree.getroot()

#remember to update user name and password for your own local database!
conn = psycopg2.connect("dbname=food user=zhouyiqin password=zhouyiqin ")
cur = conn.cursor()

conn_offering = psycopg2.connect("")

restaurant_id=1

for child in root:
    restaurant_name = child.attrib['name']
    restaurant_location = child.attrib['location']
    restaurant_origin = child.attrib['origin']
    restaurant_rating = child.attrib['rating']
    restaurant_time = child.attrib['restaurant_time']
    #sql = """INSERT INTO Restaurants(name)
    #         VALUES(%s)"""

    cur.execute("""
        INSERT INTO "restaurants"("name", "location", "origin", "time", "rating")
        VALUES (%s,%s,%s,%s,%s);
        """,
        #(remove_unicode(restaurant_name), remove_unicode(restaurant_location), remove_unicode(restaurant_origin), remove_unicode(restaurant_rating)))
        (restaurant_name, restaurant_location, restaurant_origin, restaurant_time,restaurant_rating))

    #cur.execute(sql, (restaurant_name,))
    conn.commit()
    #offering
    #for i in range(len(child)):
    for i in child:
        offering_name = i.attrib['name']
        offering_price = i.attrib['price']
        cur.execute("""
            INSERT INTO "offerings"("restaurant_id", "offering_name", "offering_price", "offering_rating")
            VALUES (%s,%s,%s,%s);
            """,
            (restaurant_id,offering_name,offering_price,3.00))
        conn.commit()

    restaurant_id = restaurant_id+1
conn.close()


# def remove_unicode(string_data):
#     """ (str|unicode) -> (str|unicode)

#     recovers ascii content from string_data
#     """
#     if string_data is None:
#         return string_data

#     if isinstance(string_data, str):
#         string_data = str(string_data.decode('ascii', 'ignore'))
#     else:
#         string_data = string_data.encode('ascii', 'ignore')

#     remove_ctrl_chars_regex = re.compile(r'[^\x20-\x7e]')

#     return remove_ctrl_chars_regex.sub('', string_data)
