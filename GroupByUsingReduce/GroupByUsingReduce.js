let lisst = [
    {
        cat: 0,
        name: "ali"
    },
    {
        cat: 1,
        name: "hosein"
    },
    {
        cat: 2,
        name: "reza"
    },
    {
        cat: 2,
        name: "sima"
    }
];
lisst.reduce((prev, current) => { 
    prev[current.cat].push(current)
}, {})