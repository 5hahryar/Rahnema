type MyNode = {
    readonly value: string,
    readonly next: MyNode,
}

class ImmutableLinkedList {
    readonly #head;
    constructor() {
    //   this.#length = 0;
    }

    append(node: MyNode) {
        let last = node.next;
        while(last) {
            last = last.next;
        }
        //TODO: impl this
    }

    prepend(node: MyNode) {
        return { ...node, next: this.#head };
    }
}