=begin
Now, given the same instructions, find the position of the first character that causes him to enter the basement (floor -1). The first character in the instructions has position 1, the second character has position 2, and so on.

For example:

) causes him to enter the basement at character position 1.
()()) causes him to enter the basement at character position 5.
What is the position of the character that causes Santa to first enter the basement?
=end

moves = ""

def find_basement_index(list, sum = 0, index = 0)
  return index-1 if(sum < 0 || list.size() == 0 )
  head, *tail = *list
  return find_basement_index(tail, sum + ((head == '(') ? 1 : -1), index + 1)
end