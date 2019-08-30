# Presentation

I have an array of hash representing offers from a provider:
 
```ruby
[
    {:type => :resold_train_ticket,
     :provider_name => :troc_des_trains,
     :from => "Paris", :to => "Toulouse",
     :price => 60
    },
    {:type => :resold_train_ticket,
     :provider_name => :troc_des_trains,
     :from => "Paris", :to => "Bordeaux",
     :price => 50
    },
    {:type => :resold_train_ticket,
     :provider_name => :cool_resold,
     :from => "Paris", :to => "Bordeaux",
     :price => 45
    },
    {:type => :carpooling,
     :provider_name => :bla_bla_car,
     :from => "Paris", :to => "Toulouse",
     :price => 25
    },
    {:type => :carpooling,
     :provider_name => :bla_bla_car,
     :from => "Paris", :to => "Bordeaux",
     :price => 37
    }
]
```

I want to group these hash based on the `provider_name` values, like this:

```ruby
[
    [
      {
         :type => :resold_train_ticket,
         :provider_name => :troc_des_trains,
         :from => "Paris", :to => "Toulouse",
         :price => 60
      },
      {
          :type => :resold_train_ticket,
          :provider_name => :troc_des_trains,
          :from => "Paris", :to => "Bordeaux",
          :price => 50
      }
    ],[
      {
          :type => :resold_train_ticket,
          :provider_name => :cool_resold,
          :from => "Paris", :to => "Bordeaux",
          :price => 45
      }
    ],[
      {
        :type => :carpooling,
        :provider_name => :bla_bla_car,
        :from => "Paris", :to => "Toulouse",
        :price => 25
      },
      {
        :type => :carpooling,
        :provider_name => :bla_bla_car,
        :from => "Paris", :to => "Bordeaux",
        :price => 37
      }
    ]
]
```