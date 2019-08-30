from datetime import datetime

__author__ = 'alemaire'

invoices = (
    dict(
        due_date=datetime(2015, 10, 22),
        amount_excl_vat=36,
        quantity=1,
        vat_rate=20,
        paid=False
    ),
    dict(
        due_date=datetime(2015, 9, 18),
        amount_excl_vat=28,
        quantity=1,
        vat_rate=10,
        paid=True
    ),
    dict(
        due_date=datetime(2015, 10, 23),
        amount_excl_vat=17,
        quantity=2,
        vat_rate=5,
        paid=False
    )
)


# imperative solution

def get_amount_for_month(invoices, month):
    total_amount = 0
    for invoice in invoices:
        if (invoice['due_date'].month != month):
            continue

        total_amount += invoice['amount_excl_vat'] \
                        + (invoice['amount_excl_vat']
                           / 100.0
                           * invoice['vat_rate']) \
                          * invoice['quantity']

    return total_amount


print get_amount_for_month(invoices, 10)


def get_amount_for_month(invoices, month):
    invoices_of_the_month = filter(
        lambda invoice: invoice['due_date'].month == month,
        invoices
    )

    incl_vat_amount = map(
        lambda invoice: invoice['amount_excl_vat'] \
                        + (invoice['amount_excl_vat']
                           / 100.0
                           * invoice['vat_rate']) \
                          * invoice['quantity'],
        invoices_of_the_month
    )

    return reduce(
        lambda x, carry: carry + x,
        incl_vat_amount
    )


def get_amount_for_month_reduced(invoices, month):
    def reducer(carry, invoice):
        if invoice['due_date'].month == month:
            carry += invoice['amount_excl_vat'] \
                     + (invoice['amount_excl_vat'] / 100
                        * invoice['vat_rate']) \
                    * invoice['quantity']
        return carry

    return reduce(reducer, invoices, 0)


print get_amount_for_month_reduced(invoices, 10)


def invoice_is_due_for(month):
    return lambda invoice: invoice['due_date'].month == month


def including_vat(invoice):
    return invoice['amount_excl_vat'] \
           + (invoice['amount_excl_vat']
              / 100.0
              * invoice['vat_rate']) \
             * invoice['quantity']


def sum_invoice_amount(x, carry):
    return carry + x


def get_amount_for_month(invoices, month):
    invoice_of_the_month = \
        filter(invoice_is_due_for(month), invoices)

    including_vat_amount = \
        map(including_vat, invoice_of_the_month)

    return reduce(sum_invoice_amount, including_vat_amount)


print get_amount_for_month(invoices, 10)


def letter_count(sentence):
    def acc_letter(carry, word):
        if (not carry.has_key(word)):
            carry[word] = 1
        else:
            carry[word] += 1

        return carry

    return reduce(acc_letter, sentence, {})


print letter_count('The Lazy Dox is Lazy')


def reduced_map(callable, collection):
    def map_reducer(carry, item):
        carry.append(callable(item))
        return carry

    return reduce(map_reducer, collection, [])


def reduced_filter(callable, collection):
    def filter_reducer(carry, item):
        if callable(item):
            carry.append(item)
        return carry

    return reduce(filter_reducer, collection, [])


def mapper(callable, collection):
    def map_reducer(carry, item):
        carry.append(callable(item))
        return carry

    return map_reducer


def filterer(callable):
    def filter_reducer(carry, item):
        if callable(item):
            carry.append(item)
        return carry

    return filter_reducer


def paid_invoice(invoice):
    return invoice['paid']


reduce(filterer(paid_invoice), invoices, [])


def appender(carry, item):
    carry.append(item)
    return carry


def mapping(callable):
    def transducer(next_reducer):
        def map_reducer(carry, item):
            return next_reducer(carry, callable(item))

        return map_reducer

    return transducer


def filtering(callable):
    def transducer(next_reducer):

        def filter_reducer(carry, item):
            if callable(item):
                return next_reducer(carry, item)
            else:
                return carry

        return filter_reducer

    return transducer


def adder(carry, item):
    return carry + item


def get_amount_for_month(invoices, month):
    return reduce(
        sum_invoice_amount,
        map(including_vat,
            filter(invoice_is_due_for(month),
                   invoices
                   )
            )
    )


def get_amount_for_month(invoices, month):
    return reduce(
        filtering(invoice_is_due_for(month))(
            mapping(including_vat)(
                adder
            )
        ),
        invoices,
        0
    )


def compose2(f, g):
    return lambda *a, **kw: f(g(*a, **kw))


def compose(*fs):
    return reduce(compose2, fs)


def get_amount_for_month(invoices, month):
    return reduce(
        compose(
            filtering(invoice_is_due_for(month)),
            mapping(including_vat),
        )(adder),
        invoices,
        0
    )


def mapity(callable, collection=None):
    if collection is None:
        return mapping(callable)
    else:
        return map(callable, collection)


def filterity(callable, collection=None):
    if collection is None:
        return filtering(callable)
    else:
        return filter(callable, collection)

def partition_by

filterity(
    paid_invoice,
    mapity(
        including_vat,
        invoices
    )
)

compose(
    filterity(paid_invoice),
    mapity(including_vat)
)(appender)
