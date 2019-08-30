# Naive but elegant solution
def fizz_buzz(up_to)
  1.upto(up_to) do |i|
    puts case
       when (i % 3 == 0) && (i % 5 == 0) then 'FizzBuzz'
       when (i % 3 == 0) then 'Fizz'
       when (i % 5 == 0) then 'Buzz'
       else i
    end
  end
end

=begin
call with fizz_buzz(100)
=end

#pure & parametrized solution
def fizz_buzz(range, predicates)
  range.map do |i|
    extract_matched_predicates(i, predicates).tap do |result|
      result << i.to_s if result.empty?
    end
  end
end

def extract_matched_predicates(i, predicates)
  predicates.select do |_, predicate| predicate.call i end.map(&:first).join
end

=begin
call with:
puts fizz_buzz 1...100, [
    ['Fizz', ->(i){i % 3 == 0}],
    ['Buzz', ->(i){i % 5 == 0}],
    ['Rezz', ->(i){i % 9 == 0}]
]
=end