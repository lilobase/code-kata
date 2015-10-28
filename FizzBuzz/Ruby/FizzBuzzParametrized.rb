
# FizzBuzz with parametrization & no intermediate variable

def fizz_buzz max, params
  (1..max).map { |current_integer|
    ->(value) {
      (value === '') ? current_integer.to_s : value
    }.(params.reduce('') { |acc, func| acc + func.(current_integer) })
  }
end

ORIGINAL_FIZZ_BUZZ = [
  -> (x) { (x % 3 === 0) ? 'Fizz' : '' },
  -> (x) { (x % 5 === 0) ? 'Buzz' : '' }
]

p fizz_buzz(15, ORIGINAL_FIZZ_BUZZ)