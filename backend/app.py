from flask import Flask, request, jsonify
from database import init_db, get_connection

app = Flask(__name__)

@app.route('/')
@app.route('/home')
def index():
    return  'Finance Tracker API is running'

@app.route('/transactions', methods=['POST'])
def add_transaction():
    data = request.get_json()
    print('Received data:', data)

    amount = data.get('amount')
    category = data.get('category')
    date = data.get('date')
    note = data.get('note', '')

    print('amount:', amount, type(amount))
    print('category:', category, type(category))
    print('date:', date, type(date))
    if amount is None or not category or not date:
        return jsonify({'error': 'ammount, category, and date are required'}), 400
    
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO transactions (amount, category, date, note)
        VALUES (?, ?, ?, ?)
    ''', (amount, category, date, note))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Transaction added seccessfully'}), 201

if __name__ == '__main__':
    init_db()
    app.run(debug=True)