Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        column: Array, // 属性名
        data: Array,
    },

    /**
     * 组件的初始数据
     */
    data: {
        column: [{
            title: 'Age',
            dataIndex: 'Age',
            key: 'Age'
        }, {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name'
        }, {
            title: 'Address',
            dataIndex: 'Address',
            key: 'Address',
        }],
        data: [{
            id:1,
            Age: 11,
            Name: '小红',
            Address: '北京',
        }, {
            id:2,
            Age: 22,
            Name: '小明',
            Address: '北京',
        }]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onClick: function (e) {
            var myEventDetail = { id: e.currentTarget.id} // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('myclick', myEventDetail, myEventOption)
        }
    }
})