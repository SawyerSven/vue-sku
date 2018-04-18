<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <div class="group" v-for="(item,index) in dataList" :key="index">
      <i-input placeholder="规格名" size="large" v-model.lazy="item.name" style="width:200px;">
         <span slot="prepend">规格名</span>
      </i-input>
      <div class="list">
        <i-input @on-blur="inputBlur(index,i,$event)" icon="close" @on-click="removeGroup(index,i)" placeholder="规格值" v-model.lazy="item.list[i]" size="large" v-for="(data,i) in item.list" :key="i" style="width:200px;">
          </i-input>        
        <i-btn type="ghost" @click="addLine(index)">添加</i-btn>
      </div>
    </div>
    <i-btn type="info" @click="addGroup">添加规格</i-btn>
    <i-table :loading="loading" :columns="columns1" :data="formatData"></i-table>

  </div>
</template>
<script>
import { Input, Button, Table } from "iview";
import { combine, formatData } from "./utils/utils";
export default {
  name: "App",
  components: {
    "i-input": Input,
    "i-btn": Button,
    "i-table": Table
  },
  data() {
    return {
      dataList: [
        {
          name: "颜色",
          list: ["红", "黄", "蓝"]
        },
        {
          name: "尺寸",
          list: ["2.2", "2.3", "2.4"]
        }
      ],
      loading:false
    };
  },
  computed: {
    columns1() {
      let arr = [];
      let defaultAttr = [
        {
          title: "库存",
          key: "库存",
          render: (h, params) => {
            let _this = this;
            return h("div", [
              h("Input", {
                props: {
                  type: "text"
                },
                domProps: {
                  value: this.formatData[params.index]["库存"],
                  disabled: this.formatData[params.index].lock
                },
                class: "ivu-input ivu-input-large",

                on: {
                  input: function(event) {
                    _this.formatData[params.index]["库存"] = event.target.value;
                  }
                }
              })
            ]);
          }
        },

        {
          title: "销量",
          key: "销量",
          render: (h, params) => {
            let _this = this;
            return h("div", [
              h("Input", {
                props: {
                  type: "text"
                },
                domProps: {
                  value: this.formatData[params.index]["销量"],
                  disabled: this.formatData[params.index].lock
                },
                class: "ivu-input ivu-input-large",
                on: {
                  input: function(event) {
                    _this.formatData[params.index]["销量"] = event.target.value;
                  }
                }
              })
            ]);
          }
        },
        {
          title: "规格编码",
          key: "规格编码",
          render: (h, params) => {
            let _this = this;
            return h("div", [
              h("Input", {
                props: {
                  type: "text"
                },
                domProps: {
                  value: this.formatData[params.index]["规格编码"],
                  disabled: this.formatData[params.index].lock
                },
                class: "ivu-input ivu-input-large",
                on: {
                  input: function(event) {
                    _this.formatData[params.index]["规格编码"] =
                      event.target.value;
                  }
                }
              })
            ]);
          }
        },
        {
          title: "成本价",
          key: "成本价",
          render: (h, params) => {
            let _this = this;
            return h("div", [
              h("Input", {
                props: {
                  type: "text"
                },
                domProps: {
                  value: this.formatData[params.index]["成本价"],
                  disabled: this.formatData[params.index].lock
                },
                class: "ivu-input ivu-input-large",
                on: {
                  input: function(event) {
                    _this.formatData[params.index]["成本价"] =
                      event.target.value;
                  }
                }
              })
            ]);
          }
        },
        {
          title: "操作",
          key: "操作",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  class: "ivu-btn ivu-btn-primary ivu-btn-small",
                  on: {
                    click: () => {
                      // this.$set(this.formatData[params.index],'lock',true)
                      // this.formatData.pop();

                    }
                  }
                },
                "禁用"
              )
            ]);
          }
        }
      ];
      for (let i = 0, len = this.dataList.length; i < len; i++) {
        arr.push({
          title: this.dataList[i].name,
          key: this.dataList[i].name
        });
      }
      return arr.concat(defaultAttr);
    },
    formatData() {
      let data = this.dataList;
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].list);
      }
      let newObjArr = [];
      let formartArr = combine(arr.reverse());
      for (let i = 0; i < formartArr.length; i++) {
        let obj = {};
        let columnObj = {};
        for (let j = 0; j < formartArr[i].length; j++) {
          obj[data[j].name] = formartArr[i][j];
          obj["库存"] = 0;
          obj["销量"] = 0;
          obj["规格编码"] = 0;
          obj["成本价"] = 0;
          obj["lock"] =( Math.random()*100 - 50) > 0;
        }
        newObjArr.push(obj);
      }
      return newObjArr;
    }
  },
  methods: {
    addLine(i) {
      // this.dataList.push({});
      this.dataList[i].list.push("");
    },
    inputBlur(index, i, e) {
      if (!this.dataList[index].list[i]) {
        this.dataList[index].list.splice(i, 1);
      }
    },
    addGroup() {
      this.dataList.push({ name: "", list: [] });
    },
    removeGroup(index, i) {
      this.dataList[index].list.splice(i, 1);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
