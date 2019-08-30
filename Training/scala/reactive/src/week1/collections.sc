abstract class List[+T] {
  def map[U](f: T => U): List[U] = this match {
    case x::xs => f(x)::xs.map(f)
    case Nil => Nil
  }
  def flatMap[U](f: T => U): List[U] = this match {
    case x::xs => f(x) ++ xs.map(f)
    case Nil => Nil
  }
  def filter(p: T => Boolean): List[U] = this match {
    case x::xs =>
      if(p(x)) x::xs.filter(p) else xs.filter(p)
    case Nil => Nil
  }
}

(1 until n) flatMap (i =>
  (1 until i) filter (j => isPrime(i + j)) map
    (j => (i, j)))

for {
  1 <- until n
  j <- until i
  if isPrime(i + j)
} yield (i, j)

val data: List[JSON] = ...
for {
  JObj(bindings) <- data
  JSeq(phones) = bindings("phoneNumbers")
  JObj(phone) <- phones
  JStr(digits) = phone("number")
  if digits startsWith "212"
} yield (bindings("fisrtName"), bindings("lastName"))