import { observable, action } from 'mobx';
class tree {
    @observable data = [];
    @action
    init() {
        this.data = [{
            id: 1,
            name: 'a1',
            children: [{
                id: 1,
                name: 'b'
            },
            {
                id: 2,
                name: 'b2',
                children: [{
                    id: 1,
                    name: 'c'
                }]
            }]
        },
        {
            id: 2,
            name: 'a2',
            children: [{
                id: 1,
                name: 'b1'
            }]
        }
        ]
    }
    action
    modifyData(deep,index){
        this.data[0].name=Math.random();
    }
}
export default new tree();