import pymysql

try:
    conn = pymysql.connect(
        host="mysql-140cc5e9-skct-dc1c.d.aivencloud.com",
        port=26983,
        user="avnadmin",
        password="YOUR_COPIED_AIVEN_PASSWORD",
        database="defaultdb",
        ssl={'ssl': True}
    )
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, role, created_at FROM users;")
    rows = cursor.fetchall()
    print("AIVEN CLOUD MYSQL USERS TABLE:")
    for row in rows:
        print(row)
except Exception as e:
    print("Error:", e)
