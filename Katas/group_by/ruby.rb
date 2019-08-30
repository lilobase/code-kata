#======
#Most simple solution based on the built-in group_by
alternatives.group_by do |alternative|
  alternative[:provider_name]
end.values

#======
#Second solution with a naive approach
def group_by(collection, grouping_key)
  [].tap do |providers| #building the returned Array
    extract_uniq_values_for_key(collection, grouping_key).each do |provider_name|
      current_provider_array, collection = collection.partition{|h| h[grouping_key] == provider_name} #reducing the collection
      providers << current_provider_array
    end
  end
end

def extract_uniq_values_for_key(collection, key)
  collection.map{|c| c[key]}.uniq!
end

#=====
#Last approach map & reduce based
def group_by(collection, grouping_value)
  collection.reduce({}) do |acc, item| #we build a dictionary (or hashmap)
    acc.tap do |acc| #because I love old fashioned functional style
      acc[item[grouping_value]] ||= [] #because a new value
      acc[item[grouping_value]] << item
    end
  end.map do |key, value| #transform the hash to an array
    value
  end
end