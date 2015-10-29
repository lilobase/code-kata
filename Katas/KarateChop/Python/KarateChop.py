def sub_chop(find, array):
    array_middle = len(array) / 2

    if find < array[array_middle]: return [0, array[:array_middle]]

    if find > array[array_middle]: return [array_middle, array[array_middle:]]

    return [array_middle, [array[array_middle]]]


def chop(find, array, index_to=0):
    if len(array) == 0: return -1

    if len(array) == 1:
        return index_to if array[0] == find else -1

    sub_index_to, sub_array = sub_chop(find, array)

    return chop(find, sub_array, index_to + sub_index_to)


def test_it_is_not_in_the_array():
    assert chop(3, []) == -1
    assert chop(3, []) == -1


def test_it_is_in_a_single_item_array():
    assert chop(1, [1]) == 0


def test_it_is_inside_the_array():
    assert chop(1, [1, 3, 5]) == 0
    assert chop(3, [1, 3, 5]) == 1
    assert chop(5, [1, 3, 5]) == 2

def test_it_is_not_in_the_array():
    assert chop(0, [1, 3, 5]) == -1
    assert chop(2, [1, 3, 5]) == -1
    assert chop(4, [1, 3, 5]) == -1
    assert chop(6, [1, 3, 5]) == -1

def test_other_situations():
    assert chop(1, [1, 3, 5, 7]) == 0
    assert chop(3, [1, 3, 5, 7]) == 1
    assert chop(5, [1, 3, 5, 7]) == 2
    assert chop(7, [1, 3, 5, 7]) == 3
    assert chop(0, [1, 3, 5, 7]) == -1
    assert chop(2, [1, 3, 5, 7]) == -1
    assert chop(4, [1, 3, 5, 7]) == -1
    assert chop(6, [1, 3, 5, 7]) == -1
    assert chop(8, [1, 3, 5, 7]) == -1