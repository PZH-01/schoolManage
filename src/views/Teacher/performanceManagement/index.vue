<template lang='pug'>
.classgrade
  .left(v-if='isAdmin === "admin"')
    .head
      //- a-icon.icon(
      //-   type='iconguanliyuan-01',
      //-   style='fontsize: 24px; color: #357ef7'
      //- )
      span.span1 管理员
    a-list.teacherlist(
      :data-source='teacherList',
      rowKey='code',
      :split='false',
      :loading='loading',
      :loadingMore='loadingMore',
      :showLoadingMore='showLoadingMore'
    )
      template(v-slot:renderItem='{ item, index }')
        a-list-item.btn(
          @click='changeList(index, item)',
          :class='{ selected: index == checkindex }'
        ) {{ item.name }}
      template(#loadMore)
        div(
          v-if='showLoadingMore',
          :style='{ textAlign: "center", marginTop: "12px", height: "32px", lineHeight: "32px" }'
        )
          a-spin(v-if='loadingMore')
          //- a-button(v-else, @click='onLoadMore') 加载更多
  .right(
    :class='{ "right-admin": isAdmin === "admin", "right-teacher": isAdmin === "teacher" }'
  )
    .head
      .left-btns
        //- a-button.btn.btndaochu(type='default', @click='daochu')
        //-   //- a-icon(type='icondaochu-01', style='margin-right: 5px')
        //-   span 导出
        a-button.link-btn(type='link', @click='showVisibleHelp') 帮助提示
          .q-tip ？
    .line
    .body
      a-table(
        :columns='columns',
        v-model:dataSource='data',
        :loading='queryListLoding',
        :pagination='pagination',
        rowKey='id',
        :scroll='{ x: scrollx }'
      )
        template(v-slot:studenttotal='{ text, record }')
          a-button.btn-link(type='link', @click='goToInfo(record)') {{ text }}
        template(v-slot:action='{ text, record }')
          a(@click='download(record)') 下载详情
    //- 帮助提示
    a-modal(
      title='帮助提示',
      :visible='modalVisibleHelp',
      @cancel='handleCancelHelp',
      :footer='null',
      centered,
      :width='480',
      :bodyStyle='{ height: "200px" }'
    )
      div 1、班级成绩为该班级下所有学生在平台学习的平均成绩；
      div 2、系统每日23时50分更新当日成绩；
      div 3、用户可前往成绩统计查看可视化图表；
</template>
<script lang='ts'>
import {
  Button, List, Modal, Pagination, Spin, Table,
} from 'ant-design-vue';
import {
  ref, reactive, defineAsyncComponent, onMounted, toRaw,
} from 'vue';
import { useStore } from 'vuex';
// import dragTable from '@a/components/DraggableTable.vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    // aIcon: defineAsyncComponent(() => import('@/components/Icon.vue')),
    aList: List,
    aButton: Button,
    aListItem: List.Item,
    aTable: Table,
    aModal: Modal,
    // dragTable,
    aPagination: Pagination,
    aSpin: Spin,
  },
  setup() {
    const router = useRouter();
    // 判断是否为管理员
    const isAdmin = sessionStorage.role;
    const store = useStore();
    // 左侧教师列表数据
    const teacherList = ref([]);
    // 左侧列表的loading
    const loading = ref(false);
    // 图标是否正在加载更多
    const loadingMore = ref(false);
    // 是否展示加载更多按钮
    const showLoadingMore = ref(true);
    let pageNo = 1;
    // let totalRecords = 0;
    // 请求左侧教师列表
    async function getTeacherList() {
      const pageSize = 20;
      const data = { pageNo, pageSize };
      loading.value = true;
      await store.dispatch('Grades/getteacherList', data).then((res) => {
        teacherList.value = res.list;
        pageNo = res.nextPageNo;
        loading.value = false;
        // totalRecords = res.totalRecords;
      });
    }
    // 请求加载更多
    // function onLoadMore() {
    //   loadingMore.value = true;
    //   const pageSize = 10;
    //   const data = { pageNo, pageSize };
    //   loading.value = true;
    //   store.dispatch('GradesManagement/getteacherList', data).then((res) => {
    //     if (teacherList.value.length >= totalRecords) {
    //       message.error('已加载全部教师');
    //     } else {
    //       teacherList.value = teacherList.value.concat(res.list);
    //       pageNo = res.nextPageNo;
    //     }
    //     loading.value = false;
    //     loadingMore.value = false;
    //   });
    // }

    // 右侧表格配置项
    const columns = reactive([
      {
        title: '班级名称',
        dataIndex: 'name',
        align: 'left',
      },
      {
        title: '学生数量',
        dataIndex: 'stuNum',
        align: 'left',
        slots: { customRender: 'studenttotal' },
      },
      {
        title: '计算机应用基础(一)',
        dataIndex: 'jisuanji',
        align: 'left',
      },
      {
        title: '日语入门',
        dataIndex: 'riyu',
        align: 'left',
      },
      {
        title: '毛泽东思想和中国特色社会主义理论体系概论',
        dataIndex: 'maogai',
        align: 'left',
      },
      {
        title: '思想政治理论课社会实践',
        dataIndex: 'zhengzhi',
        align: 'left',
      },
      {
        title: '程序设计基础',
        dataIndex: 'chengxu',
        align: 'left',
      },
      {
        title: '交互设计',
        dataIndex: 'jiaohu',
        align: 'left',
      },
      {
        title: '网页设计与制作',
        dataIndex: 'wangye',
        align: 'left',
      },
      {
        title: '媒体制作综合实训',
        dataIndex: 'meiti',
        align: 'left',
      },
      {
        title: '数字出版物制作实务',
        dataIndex: 'shuzi',
        align: 'left',
      },
    ]);
    // 右侧表格请求中状态变量
    const queryListLoding = ref(false);
    // 右侧列表数据源
    const data = ref([]);
    // 请求过来的完整数据
    const daochuData = ref({});
    const userId = sessionStorage.code;
    const scrollx = ref(2000);
    // 请求右侧列表
    function getList() {
      const searchId = sessionStorage.role === 'admin'
        ? (teacherList.value[0] as { code: string }).code
        : userId;
      scrollx.value = 2000;
      store.dispatch('Grades/getClassGradesList', searchId).then((res) => {
        /**
         * 2020年12月24日——列多余锚点
         */
        // columns.length = 4;
        // for (let i = 0; i < res.tableName.length + 1; i += 1) {
        //   columns[i] = {
        //     title: res.tableName[i].title,
        //     dataIndex: res.tableName[i].dataIndex,
        //     align: 'center',
        //   };
        //   scrollx.value += 200;
        // }
        daochuData.value = res;
        data.value = res.tableData;
        console.log(res);
      });
    }
    // 列表分页器配置项
    const pagination = reactive({
      pageSizeOptions: ['50'],
      showQuickJumper: true,
      showSizeChanger: true,
      total: 0,
      current: 1,
      pageSize: 50,
    });

    // // 进入学生成绩页面
    // function goToInfo(record: [0, 1]) {
    //   router.push({
    //     name: 'Teacher/PerformanceManagement/StudentGrades',
    //     params: { classId: record[0], teacherId: record[1] },
    //   });
    // }
    // 初始化第一个选项高亮
    const checkindex = ref(0);
    // 点击教师切换列表
    function changeList(index: number, item: { code: string }) {
      // if (index === checkindex.value) {
      //   console.log('请不要重复请求');
      // } else {
      queryListLoding.value = true;
      const scrollxAll = 2000;
      // scrollx.value = 800;
      store.dispatch('Grades/getClassGradesList', item.code).then((res) => {
        /**
         * 2020年12月24日——列多余锚点
         * bug：点击其他教师后，后面的列有可能比之前的多，因为原本的写法只处理了指定下标
         * 如果点击下一个教师a的列比上一个教师b的列多，那么a的列就会多
         * fix：在每次请求后，都把表格列数重置为4，即去掉后面的多余列
         * remark：数量为4和for从4开始，目前推测为后端返回前4列都是固定的
         */
        // columns.length = 4;
        // for (let i = 4; i < res.tableName.length; i += 1) {
        //   columns[i] = {
        //     title: res.tableName[i],
        //     dataIndex: i.toString(),
        //     align: 'center',
        //   };
        //   scrollxAll += 200;
        // }
        scrollx.value = scrollxAll; // 防止抖动
        daochuData.value = res;
        data.value = res.tableData;
      });
      checkindex.value = index;
      queryListLoding.value = false;
      // }
    }
    onMounted(async () => {
      await getTeacherList();
      getList();
    });
    // 帮助面板
    const modalVisibleHelp = ref(false);
    const showVisibleHelp = () => {
      modalVisibleHelp.value = true;
    };
    const handleCancelHelp = () => {
      modalVisibleHelp.value = false;
    };
    // 导出
    function daochu() {
      const { tableData, tableName } = {
        ...toRaw(daochuData.value as { tableData: []; tableName: [] }),
      };
      console.log(tableData, tableName);
      store
        .dispatch('GradesManagement/daochuClassGrades', {
          tableData,
          tableName,
        })
        .then((res) => {
          window.open(res);
        });
    }
    // 编辑
    function download(record: {}) {
      console.log('下载详情', record);
    }
    return {
      teacherList,
      getTeacherList,
      changeList,
      checkindex,
      queryListLoding,
      pagination,
      columns,
      data,
      modalVisibleHelp,
      showVisibleHelp,
      handleCancelHelp,
      daochu,
      download,
      isAdmin,
      loading,
      loadingMore,
      showLoadingMore,
      // onLoadMore,
      scrollx,
    };
  },
};
</script>
<style lang='stylus' scoped>
.classgrade
  display flex
  .left
    width 180px
    height 100%
    background #FFFFFF
    box-shadow 0px 0px 2px 2px rgba(0, 0, 0, 0)
    border-radius 8px
    .head
      width 100%
      height 64px
      display flex
      justify-content center
      align-items center
      border-bottom #F0F0F0 1px solid
      .icon
        width 24px
        height 24px
    .teacherlist
      margin 0
      padding 0
      .btn
        // width 160px
        width 122px
        height 32px
        margin 9px auto
        text-align center
        border-radius 4px
        font-weight 400
        cursor pointer
        display flex
        justify-content center
        align-items center
        overflow hidden
        text-overflow ellipsis
      .selected
        background #357EF7
        color white
  .right
    margin-left 19px
    background #FFFFFF
    box-shadow 0px 0px 2px 2px rgba(0, 0, 0, 0)
    border-radius 8px
    display flex
    flex-direction column
    .btn
      border-radius 3px
      border 1px solid #357EF7
      font-family PingFangSC-Regular, PingFang SC
      font-weight 400
      color #357EF7
      line-height 20px
    .head
      width 100%
      height 64px
      padding 0 16px
      border-bottom 1px solid #F0F0F0
      display flex
      justify-content space-between
      .left-btns
        display flex
        justify-content space-around
        align-items center
        .btn
          margin-left 13px
        .link-btn
          padding 0 !important
          margin-left 13px
          .q-tip
            background #FF3300
            width 12px
            height 12px
            top 3px
            right -11px
            color #ffffff
            position absolute
            border-radius 6px
            line-height 1
            padding-left 3px
            font-size 12px
      .sort-btns
        display flex
        justify-content space-around
        align-items center
        .btn
          margin-left 13px
    .line
      width 100%
      margin 5px 0px
    :deep().ant-table
      padding 13px
    :deep().ant-table-pagination
      margin-right 13px
.right-admin
  width 85%
.right-teacher
  width 100%
</style>
