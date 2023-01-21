"""
Reporte 1
El equipo de ventas quiere saber el total de cada pedido. 
Debe generar un fichero llamado “order_prices.csv” con las siguientes columnas:

id: ID del pedido

total: Total del pedido en euros


Reporte 2
El equipo de marketing quiere saber que clientes han comprado cada producto. 
Debe generar un fichero llamado “product_customers.csv” con las siguientes columnas:

id: ID del producto

customer_ids: Lista de todos los IDs que han comprado ese producto 
              (Separados por un espacio)


Reporte 3
Para evaluar a los clientes, 
necesitamos un fichero que contenga todos 
los pedidos ordenados descendentemente por el total en euros:

Debe generar un fichero llamado “customer_ranking.csv" con 
las siguientes columnas:

id: ID del cliente

name: Nombre del cliente

lastname: Apellidos del cliente

total: Total en euros que el cliente ha comprado en productos.
"""


import csv

customers = {}
orders = {}
products = {}
order_prices = {}
product_customers = {}
customer_rankingD = {}
customer_rankingL = []


# Primeramente hay un bloque en el que tengo las 3 entradas de datos de los archivos csv
# y los guardo en bibliotecas, durante el programa, solo los voy a leer nunca editar.
# Aunque esto sea solo un ejercicio, lo interpreto como que mas tarde se pueda ampliar, con lo cual,
# modificar las bibliotecas iniciales podria venir mal para futuro.

with open('customers.csv', 'r', newline='', encoding="utf-8") as csvfile:
    reader = csv.reader(csvfile)
    next(reader)
    for row in reader:
        customers[row[0]] = {'firstname': row[1],
                             'lastname': row[2]
                             }

with open('orders.csv', 'r', newline='', encoding="utf-8") as csvfile:
    reader = csv.reader(csvfile)
    next(reader)
    for row in reader:
        orders[row[0]] = {'customer_id': row[1],
                          'product_ids': row[2]
                          }


with open('products.csv', 'r', newline='', encoding="utf-8") as csvfile:
    reader = csv.reader(csvfile)
    next(reader)
    for row in reader:
        products[row[0]] = {'name': row[1],
                            'cost': float(row[2])
                            }


# Reporte 1
# Creo una nueva biblioteca order_prices en base a order, ya que es la mas similar
# a lo que quiero, cambiando el string de los prodcuts_id por una array.
# Ademas para este ejercicio podria realmente solo hacer una relacion directa
# id, total, peor hago una segunda libreria con customer_id y total, porque ese cuestomer_id
# para el reporte 3 me vendrá bien.


for key, order in orders.items():
    order_prices[key] = {
        'customer_id': order['customer_id'],
        'total': order['product_ids'].split()
    }

# Por cada order se recorre la array de productos y luego se suman para obtener el total

for order in order_prices.values():
    for i, productId in enumerate(order['total']):
        order['total'][i] = products[productId]['cost']
    order['total'] = sum(order['total'])

# Y finalmente se escribe en order_prices.csv

file = open('order_prices.csv', 'w', newline='', encoding="utf-8")
with file:
    writer = csv.writer(file)
    writer.writerow(['id', 'total'])
    for key, order in order_prices.items():
        writer.writerow([key, order['total']])

# Reporte 2
# A partir de la biblioteca products con las id de los productos,
# y un set vacio, esto es mejor, ya que añado las customer_ids
# y no se repetirán


for key, product in products.items():
    product_customers[key] = set()


# Se recorren todas las orders y por cada array de productos,
# se recorre esa array añade la id del customer a product_customers.

for order in orders.values():
    for productId in order['product_ids'].split():
        product_customers[productId].add(order['customer_id'])

# Se escribe en product_customers.csv
with open('product_customers.csv', 'w', newline='', encoding="utf-8") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['id', 'customer_ids'])
    for key, product in product_customers.items():
        writer.writerow([key, " ".join(product)])

# Reporte 3
# Se crea una copia de la biblioteca de customers, pero añadiendo la clave de total
for key, customer in customers.items():
    customer_rankingD[key] = {
        'name': customer['firstname'],
        'lastname': customer['lastname'],
        'total': float(0)
    }

# Por cada order en order_prices, que es la biblioteca del primer ejercicio,
# se añade el total de forma sencilla, debido a que añadí el customer_id
for order in order_prices.values():
    customer_rankingD[order['customer_id']
                      ]['total'] += order['total']


# Ahora se convierte la biblioteca en una lista
for key, customer in customer_rankingD.items():
    customer_rankingL.append({
        'id': key,
        'name': customer['name'],
        'lastname': customer['lastname'],
        'total': customer['total']})

# Se ordena de mayor a menor por el total
customer_rankingL.sort(reverse=True, key=lambda customer: customer['total'])


# Y finalmente se crea el archivo
file = open('customer_ranking.csv', 'w', newline='', encoding="utf-8")
with file:
    writer = csv.DictWriter(
        file, fieldnames=['id', 'name', 'lastname', 'total'])
    writer.writeheader()
    writer.writerows(customer_rankingL)
