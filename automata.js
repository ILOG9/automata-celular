class Automata {
    constructor(size, ctx) {
        this.size = size
        this.ctx = ctx
        this.cells = []
    }

    create() {
        this.cells = new Array(this.size)
            .fill('')
            .map(() =>
                new Array(this.size).fill('').map(() => Math.random() < 0.5)
            )
    }

    print() {
        this.ctx.clearRect(0, 0, this.size, this.size)
        for (let i = 0; i < this.size; i++) {
            for (let k = 0; k < this.size; k++) {
                this.ctx.fillStyle = this.cells[i][k] ? 'black' : 'white'
                this.ctx.fillRect(i, k, 1, 1)
            }
        }
    }

    evaluate() {
        let cellsAux = new Array(this.size)
            .fill('')
            .map(() => new Array(this.size).fill(false))

        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                let livingNeighbor = 0
                //1
                if (x > 0 && y > 0)
                    if (this.cells[x - 1][y - 1]) livingNeighbor++

                //2
                if (y > 0) if (this.cells[x][y - 1]) livingNeighbor++

                //3
                if (x < this.size - 1 && y > 0)
                    if (this.cells[x + 1][y - 1]) livingNeighbor++

                //4
                if (x > 0) if (this.cells[x - 1][y - 1]) livingNeighbor++

                //5
                if (x < this.size - 1)
                    if (this.cells[x + 1][y]) livingNeighbor++

                //6
                if (x > 0 && y < this.size - 2)
                    if (this.cells[x - 1][y + 1]) livingNeighbor++

                //7
                if (y < this.size - 1)
                    if (this.cells[x][y + 1]) livingNeighbor++

                //8
                if (x < this.size - 1 && y < this.size - 1)
                    if (this.cells[x + 1][y + 1]) livingNeighbor++

                if (this.cells[x][y]) {
                    cellsAux[x][y] =
                        livingNeighbor == 2 || livingNeighbor == 3
                            ? true
                            : false
                } else {
                    cellsAux[x][y] = livingNeighbor == 3 ? true : false
                }
            }
        }
        this.cells = cellsAux
    }

    next() {
        this.print()
        this.evaluate()
    }
}

const ctx = canvas.getContext('2d')
const automata = new Automata(500, ctx)

automata.create()

setInterval(() => {
    automata.next()
}, 300)
