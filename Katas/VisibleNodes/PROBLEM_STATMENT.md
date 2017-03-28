# Visibles Nodes
You have to count the "visible" nodes in a binary tree shaped like this :

```javascript
const tree = {
    v: 5,
    l: {
        v: 3,
        l: {
            v: 20,
            l: null,
            r: null
        },
        r: {
            v: 21,
            l: null,
            r: null
        }
    },
    r: {
        v: 10,
        l: {
            v: 1,
            l: null,
            r: null
        },
        r: null
    }
};
```

A visible node is a node which has no parents with a higher value than him.
In this case the visible node count is 4 (nodes 3 & 1 are excluded).
