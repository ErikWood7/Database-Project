#!/usr/bin/env python
import os
import time
from flask import Flask, abort, request, jsonify, g, url_for
from flask_httpauth import HTTPBasicAuth
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from flaskext.mysql import MySQL


# initialization
app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
db = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'admin'
app.config['MYSQL_DATABASE_DB'] = 'inventory_management'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
db.init_app(app)

import mysql.connector

def connection():
    conn = mysql.connector.connect(host="localhost",
                           user = "root",
                           passwd = "admin",
                           db = "inventory_management")
    c = conn.cursor()

    return c, conn

@app.route('/login/', methods=["POST"])
def login_page():
    error = ''
    try:
        c, conn = connection()
        if request.method == "POST":

            user = request.json.get('username')
            password = request.json.get('password')
            data = c.execute(f"SELECT * FROM users WHERE username = \"{user}\"")
            
            data = c.fetchone()
            if len(data) == 0: return "Wrong Username"
            data = data[2]
            if (data == password): return "Success"
            else: return "Wrong Password"

        return "Bad Request"
    except Exception as e:
        return str(e)

'''
CRUD APIs 
'''

# Create
@app.route('/insertConsumer/', methods=["POST"])
def insertConsumer():
    error = ''
    try:
        c, conn = connection()
        headers = ['customer_email', 'first_name', 'last_name', 'phone_num']
        header_str = ', '.join(headers)
        if request.method == "POST":
            customer_email = request.json.get('customer_email')
            first_name = request.json.get('first_name')
            last_name = request.json.get('last_name')
            phone_num = request.json.get('phone_num')
            if not customer_email: return "Please provide email"
            insert_statement = f'''Insert into `Customer` (Customer_email, First_Name, Last_Name, Phone_Num) VALUES (
                                "{customer_email}",
                                "{first_name}",
                                "{last_name}",
                                "{phone_num}");'''
            c.execute(insert_statement)
            conn.commit()
        else:
            return "Fail"
    except Exception as e:
        return str(e)

# Read
@app.route('/consumers/', methods=["GET", "POST"])
def get_consumers():
    error = ''
    try:
        c, conn = connection()
        headers = ['customer_email', 'first_name', 'last_name', 'phone_num']
        header_str = ', '.join(headers)
        print(header_str)
        if request.method == "POST":

            user = request.json.get('customer_email')
            if not user: return "Please provide email"
            data = c.execute(f"SELECT {header_str} FROM Customer WHERE Customer_email = \"{user}\"")
            
            data = c.fetchone()
            if len(data) == 0: return "Wrong email"
            return {h: data[idx] for idx, h in enumerate(headers)}

        data = c.execute(f"SELECT {header_str} FROM Customer")
        data = c.fetchall()
        return {id: {h: datum[idx] for idx, h in enumerate(headers)} for id, datum in enumerate(data)}
    except Exception as e:
        return str(e)

# Update
@app.route('/updateConsumer/', methods=["POST"])
def updateConsumer():
    error = ''
    try:
        c, conn = connection()
        headers = ['customer_email', 'first_name', 'last_name', 'phone_num']
        header_str = ', '.join(headers)
        if request.method == "POST":
            customer_email = request.json.get('customer_email')
            first_name = request.json.get('first_name')
            last_name = request.json.get('last_name')
            phone_num = request.json.get('phone_num')
            if not customer_email: return "Please provide email"
            if first_name:
                update_statement = f'''UPDATE `Customer` SET 
                                    first_name = "{first_name}" WHERE 
                                    customer_email = "{customer_email}"
                                    );'''
                c.execute(update_statement)
            if last_name:
                update_statement = f'''UPDATE `Customer` SET 
                                    last_name = "{last_name}" WHERE 
                                    customer_email = "{customer_email}"
                                    );'''
                c.execute(update_statement)
            if phone_num:
                update_statement = f'''UPDATE `Customer` SET 
                                    phone_num = "{phone_num}" WHERE 
                                    customer_email = "{customer_email}"
                                    );'''
                c.execute(update_statement)
            conn.commit()
        else:
            return "Fail"
    except Exception as e:
        return str(e)

# Delete
@app.route('/deleteConsumer/', methods=["POST"])
def deleteConsumer():
    try:
        c, conn = connection()
        if request.method == "POST":
            user = request.json.get('customer_email')
            if user:
                c.execute(f"DELETE FROM Customer WHERE Customer_email = \"{user}\"")
                conn.commit()

            return "No data found to delete"
        else:
            return "No data found to delete"
    except Exception as e:
        return str(e)

# Create
@app.route('/insertVehicle/', methods=["POST"])
def insertVehicle():
    error = ''
    try:
        c, conn = connection()
        headers = ["VIN", "Customer_email", "Year", "Make", "Model", "Paint_Code"]
        header_str = ', '.join(headers)
        if request.method == "POST":
            vin = request.json.get('vin')
            customer_email = request.json.get('customer_email')
            year = request.json.get('year')
            make = request.json.get('make')
            model = request.json.get('model')
            paint_code = request.json.get('paint_code')
            if not customer_email: return "Please provide email"
            if not vin: return "Please provide vehicle id"
            insert_statement = f'''Insert into `Vehicle` (VIN, Customer_email, Year, Make, Model, Paint_Code) VALUES (
                                "{vin}",
                                "{customer_email}",
                                {year},
                                "{make}",
                                "{model}",
                                "{paint_code}");'''
            c.execute(insert_statement)
            conn.commit()
        else:
            return "Fail"
    except Exception as e:
        return str(e)

# Read
@app.route('/vehicles/', methods=["GET", "POST"])
def get_vehicles():
    error = ''
    try:
        c, conn = connection()
        headers = ["VIN", "Customer_email", "Year", "Make", "Model", "Paint_Code"]
        header_str = ', '.join(headers)
        if request.method == "POST":

            user = request.json.get('customer_email')
            if user:
                data = c.execute(f"SELECT {header_str} FROM Vehicle WHERE Customer_email = \"{user}\"")
                data = c.fetchall()
                if len(data): return {id: {h: datum[idx] for idx, h in enumerate(headers)} for id, datum in enumerate(data)}
            
            vin = request.json.get('vin')
            if vin: data = c.execute(f"SELECT {header_str} FROM Vehicle WHERE VIN = \"{vin}\"")
            data = c.fetchone()
            if len(data) == 0: return "Wrong VIN"
            return {h: data[idx] for idx, h in enumerate(headers)}

        else:
            data = c.execute(f"SELECT {header_str} FROM Vehicle")
            data = c.fetchall()
            if len(data): 
                return {id: {h: datum[idx] for idx, h in enumerate(headers)} for id, datum in enumerate(data)}
            else: return "Emptied out"
    except Exception as e:
        return str(e)

# Update
@app.route('/updateVehicle/', methods=["POST"])
def updateVehicle():
    error = ''
    try:
        c, conn = connection()
        headers = ["VIN", "Customer_email", "Year", "Make", "Model", "Paint_Code"]
        header_str = ', '.join(headers)
        if request.method == "POST":
            vin = request.json.get('vin')
            customer_email = request.json.get('customer_email')
            year = request.json.get('year')
            make = request.json.get('make')
            model = request.json.get('model')
            paint_code = request.json.get('paint_code')
            if not vin: return "Please provide vehicle id"
            if customer_email:
                update_statement = f'''UPDATE `Vehicle` SET 
                                    customer_email = "{customer_email}" WHERE 
                                    VIN = "{vin}"
                                    );'''
                c.execute(update_statement)
            if year:
                update_statement = f'''UPDATE `Vehicle` SET 
                                    year = {year} WHERE 
                                    VIN = "{vin}"
                                    );'''
                c.execute(update_statement)
            if make:
                update_statement = f'''UPDATE `Vehicle` SET 
                                    make = "{make}" WHERE 
                                    VIN = "{vin}"
                                    );'''
                c.execute(update_statement)
            if model:
                update_statement = f'''UPDATE `Vehicle` SET 
                                    model = "{model}" WHERE 
                                    VIN = "{vin}"
                                    );'''
                c.execute(update_statement)
            if paint_code:
                update_statement = f'''UPDATE `Vehicle` SET 
                                    paint_code = "{paint_code}" WHERE 
                                    VIN = "{vin}"
                                    );'''
                c.execute(update_statement)
            conn.commit()
        else:
            return "Fail"
    except Exception as e:
        return str(e)

# Delete
@app.route('/deleteVehicle/', methods=["POST"])
def deleteVehicle():
    try:
        c, conn = connection()
        if request.method == "POST":
            user = request.json.get('customer_email')
            if user:
                c.execute(f"DELETE FROM Vehicle WHERE Customer_email = \"{user}\"")
                conn.commit()

            vin = request.json.get('vin')
            if vin:
                c.execute(f"DELETE FROM Vehicle WHERE VIN = \"{vin}\"")
                conn.commit()

            return "No data found to delete"
        else:
            return "No data found to delete"
    except Exception as e:
        return str(e)



# Create
@app.route('/insertRepair/', methods=["POST"])
def insertRepair():
    error = ''
    try:
        c, conn = connection()
        headers = ["Repair_id", "VIN", "Repair_detail", "Note"]
        header_str = ', '.join(headers)
        if request.method == "POST":
            vin = request.json.get('vin')
            repair_detail = request.json.get('repair_detail')
            note = request.json.get('note')
            if not vin: return "Please provide vehicle id"
            insert_statement = f'''Insert into `Repair` (VIN, Repair_detail, Note) VALUES (
                                "{vin}",
                                "{repair_detail}",
                                "{note}");'''
            c.execute(insert_statement)
            conn.commit()
        else:
            return "Fail"
    except Exception as e:
        return str(e)


# Read
@app.route('/repairs/', methods=["GET", "POST"])
def get_repairs():
    error = ''
    try:
        c, conn = connection()
        headers = ["Repair_id", "VIN", "Repair_detail", "Note"]
        header_str = ', '.join(headers)
        if request.method == "POST":

            user = request.json.get('customer_email')
            if user:
                print(user)
                data = c.execute(f"SELECT VIN FROM Vehicle WHERE Customer_email = \"{user}\"")
                data = c.fetchall()
                vins = [datum[0] for datum in data]
                print(vins)
                final_data = []
                for vin in vins:
                    data = c.execute(f"SELECT {header_str} FROM Repair WHERE VIN = \"{vin}\"")
                    data = c.fetchall()
                    for datum in data: final_data.append(datum)
                print(final_data)
                if len(final_data):
                    return {id: {h: datum[idx] for idx, h in enumerate(headers)} for id, datum in enumerate(data)}

            vin = request.json.get('vin')
            if vin: 
                data = c.execute(f"SELECT {header_str} FROM Repair WHERE VIN = \"{vin}\"")
                data = c.fetchall()
                print(data)
                if len(data) == 0: 
                    return "Wrong id"
                return {id: {h: datum[idx] for idx, h in enumerate(headers)} for id, datum in enumerate(data)}

            repair_id = request.json.get('repair_id')
            if repair_id:
                data = c.execute(f"SELECT {header_str} FROM Repair WHERE Repair_id = \"{repair_id}\"")
                data = c.fetchone()
                print(data)
                if len(data) == 0:
                    return "Wrond id"

                return {h: data[idx] for idx, h in enumerate(headers)}
            else: pass
            
        else: 
            data = c.execute(f"SELECT {header_str} FROM Repair")
            data = c.fetchall()
            print(data)
            return {id: {h: datum[idx] for idx, h in enumerate(headers)} for id, datum in enumerate(data)}

    except Exception as e:
        return str(e)

# Update
@app.route('/updateRepair/', methods=["POST"])
def updateRepair():
    error = ''
    try:
        c, conn = connection()
        headers = ["Repair_id", "VIN", "Repair_detail", "Note"]
        header_str = ', '.join(headers)
        if request.method == "POST":
            repair_id = request.json.get('repair_id')
            vin = request.json.get('vin')
            repair_detail = request.json.get('repair_detail')
            note = request.json.get('note')
            if not repair_id: return "Please provide repair id"
            if vin:
                update_statement = f'''UPDATE `Repair` SET 
                                    vin = "{vin}" WHERE 
                                    Repair_id = "{repair_id}"
                                    );'''
                c.execute(update_statement)
            if Repair_detail:
                update_statement = f'''UPDATE `Repair` SET 
                                    Repair_detail = "{repair_detail}" WHERE 
                                    Repair_id = "{repair_id}"
                                    );'''
                c.execute(update_statement)
            if Note:
                update_statement = f'''UPDATE `Repair` SET 
                                    Note = "{note}" WHERE 
                                    Repair_id = "{repair_id}"
                                    );'''
                c.execute(update_statement)
            conn.commit()
        else:
            return "Fail"
    except Exception as e:
        return str(e)

# Delete
@app.route('/deleteRepair/', methods=["POST"])
def deleteRepair():
    try:
        c, conn = connection()
        if request.method == "POST":
            user = request.json.get('customer_email')
            if user:
                data = c.execute(f"SELECT VIN FROM Vehicle WHERE Customer_email = \"{user}\"")
                data = c.fetchall()
                vins = [datum[0] for datum in data]
                for vin in vins:
                    c.execute(f"DELETE FROM Repair WHERE VIN = \"{vin}\"")
                    conn.commit()

            vin = request.json.get('vin')
            if vin:
                c.execute(f"DELETE FROM Repair WHERE VIN = \"{vin}\"")
                conn.commit()

            repair_id = request.json.get('repair_id')
            if repair_id:
                c.execute(f"DELETE FROM Repair WHERE Repair_id = \"{repair_id}\"")
                conn.commit()

            return "No data found to delete"
        else:
            return "No data found to delete"
    except Exception as e:
        return str(e)


# Create
@app.route('/insertPart/', methods=["POST"])
def insertPart():
    error = ''
    try:
        c, conn = connection()
        headers = ["Part_id", "Repair_id", "OrderStatus", "Part_detail"]
        header_str = ', '.join(headers)
        if request.method == "POST":
            repair_id = request.json.get('repair_id')
            part_detail = request.json.get('part_detail')
            order_status = request.json.get('order_status')
            if not repair_id: return "Please provide repair id"
            insert_statement = f'''Insert into `Part` (Repair_id, Part_detail, OrderStatus) VALUES (
                                "{repair_id}",
                                "{part_detail}",
                                "{order_status}");'''
            c.execute(insert_statement)
            conn.commit()
        else:
            return "Fail"
    except Exception as e:
        return str(e)

# Read
@app.route('/parts/', methods=["GET", "POST"])
def get_parts():
    error = ''
    try:
        c, conn = connection()
        headers = ["Part_id", "Repair_id", "OrderStatus", "Part_detail"]
        header_str = ', '.join(headers)
        if request.method == "POST":

            user = request.json.get('customer_email')
            if user:
                data = c.execute(f"SELECT VIN FROM Vehicle WHERE Customer_email = \"{user}\"")
                data = c.fetchall()
                vins = [datum[0] for datum in data]
                final_data = []
                for vin in vins:
                    data = c.execute(f"SELECT Repair_id FROM Repair WHERE VIN = \"{vin}\"")
                    data = c.fetchall()
                    repair_ids = [datum[0] for datum in data]
                    for repair_id in repair_ids:
                        data = c.execute(f"SELECT {header_str} FROM Part WHERE Repair_id = \"{repair_id}\"")
                        data = c.fetchall()
                        for datum in data: final_data.append(datum)
                print(final_data)
                if len(final_data):
                    return {id: {h: datum[idx] for idx, h in enumerate(headers)} for id, datum in enumerate(data)}

            vin = request.json.get('vin')
            data = c.execute(f"SELECT Repair_id FROM Repair WHERE VIN = \"{vin}\"")
            data = c.fetchall()
            repair_ids = [datum[0] for datum in data]
            final_data = []
            for repair_id in repair_ids:
                data = c.execute(f"SELECT {header_str} FROM Part WHERE Repair_id = \"{repair_id}\"")
                data = c.fetchall()
                for datum in data: final_data.append(datum)
            print(final_data)
            if len(final_data):
                return {id: {h: datum[idx] for idx, h in enumerate(headers)} for id, datum in enumerate(data)}
            repair_id = request.json.get('repair_id')
            if repair_id:
                data = c.execute(f"SELECT {header_str} FROM Part WHERE Repair_id = \"{repair_id}\"")
                data = c.fetchall()
                print(data)
                if len(data) == 0: return "Wrong id"
                return {id: {h: datum[idx] for idx, h in enumerate(headers)} for id, datum in enumerate(data)}

            part_id = request.json.get('part_id')
            if part_id:
                data = c.execute(f"SELECT {header_str} FROM Part WHERE Part_id = \"{part_id}\"")
                data = c.fetchone()
                print(data)
                if len(data) == 0:
                    return "Wrond id"

                return {h: data[idx] for idx, h in enumerate(headers)}

        data = c.execute(f"SELECT {header_str} FROM Part")
        data = c.fetchall()
        print(data)
        return {id: {h: datum[idx] for idx, h in enumerate(headers)} for id, datum in enumerate(data)}

    except Exception as e:
        return str(e)

# Update
@app.route('/updatePart/', methods=["POST"])
def updatePart():
    error = ''
    try:
        c, conn = connection()
        headers = ["Part_id", "Repair_id", "OrderStatus", "Part_detail"]
        header_str = ', '.join(headers)
        if request.method == "POST":
            part_id = request.json.get('part_id')
            repair_id = request.json.get('repair_id')
            part_detail = request.json.get('part_detail')
            order_status = request.json.get('order_status')
            if not part_id: return "Please provide part id"
            if repair_id:
                update_statement = f'''UPDATE `part` SET 
                                    repair_id = "{repair_id}" WHERE 
                                    part_id = "{part_id}"
                                    );'''
                c.execute(update_statement)
            if part_detail:
                update_statement = f'''UPDATE `part` SET 
                                    part_detail = "{part_detail}" WHERE 
                                    part_id = "{part_id}"
                                    );'''
                c.execute(update_statement)
            if order_status:
                update_statement = f'''UPDATE `part` SET 
                                    order_status = "{order_status}" WHERE 
                                    part_id = "{part_id}"
                                    );'''
                c.execute(update_statement)
            conn.commit()
        else:
            return "Fail"
    except Exception as e:
        return str(e)

# Delete
@app.route('/deletePart/', methods=["POST"])
def deletePart():
    try:
        c, conn = connection()
        if request.method == "POST":
            user = request.json.get('customer_email')
            if user:
                data = c.execute(f"SELECT VIN FROM Vehicle WHERE Customer_email = \"{user}\"")
                data = c.fetchall()
                vins = [datum[0] for datum in data]
                for vin in vins:
                    data = c.execute(f"SELECT Repair_id FROM Repair WHERE VIN = \"{vin}\"")
                    data = c.fetchall()
                    repair_ids = [datum[0] for datum in data]
                    for repair_id in repair_ids:
                        c.execute(f"DELETE FROM Part WHERE Repair_id = \"{repair_id}\"")
                        conn.commit()

            vin = request.json.get('vin')
            if vin:
                data = c.execute(f"SELECT Repair_id FROM Repair WHERE VIN = \"{vin}\"")
                data = c.fetchall()
                repair_ids = [datum[0] for datum in data]
                for repair_id in repair_ids:
                    c.execute(f"DELETE FROM Part WHERE Repair_id = \"{repair_id}\"")
                    conn.commit()

            repair_id = request.json.get('repair_id')
            if repair_id:
                c.execute(f"DELETE FROM Part WHERE Repair_id = \"{repair_id}\"")
                conn.commit()
            
            part_id = request.json.get('part_id')
            if part_id:
                c.execute(f"DELETE FROM Part WHERE Part_id = \"{part_id}\"")
                conn.commit()
            return "No data found to delete"
        else:
            return "No data found to delete"
    except Exception as e:
        return str(e)

           

if __name__ == '__main__':
    app.run(debug=True)
