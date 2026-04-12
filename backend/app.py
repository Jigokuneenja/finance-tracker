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

@app.route('/transactions', methods=['GET'])
def get_transactions():
    category = request.args.get('category')

    conn = get_connection()
    cursor = conn.cursor()

    if category:
        cursor.execute('''
            SELECT * FROM transactions WHERE category = ?
        ''', (category,))
    else:
        cursor.execute('SELECT * FROM transactions')

    rows = cursor.fetchall()
    conn.close()

    transactions = []
    for row in rows:
        transactions.append({
            'id': row['id'],
            'amount': row['amount'],
            'category': row['category'],
            'date': row['date'],
            'note': row['note']
        })

    return jsonify(transactions), 200

if __name__ == '__main__':
    init_db()
    app.run(debug=True)