<template>
  <div class="app-container">
    <el-tabs v-model="active" @tab-click="handleClick">
      <el-tab-pane label="未公開" name="1" class="p-8">
        <p>填運行カレンダーの新規登録はこちらからどうぞ。</p>
        <p>+ チェックした運行カレンダーを公開できます。 (確認ダイアログが表示されます)。</p>
        <p>*「編集」を選択すると、編集に進みます。</p>
        <p>*「削除」を選択すると、人確認ダイアログを表示します。</p>
        <el-table
          :data="tableData"
          :default-sort="{prop: 'date', order: 'descending'}"
          style="width: 600px"
        >
          <el-table-column
            prop="published"
            label="公開"
            min-width="80"
            sortable
          />
          <el-table-column
            prop="calendarId"
            label="カレンダーID"
            min-width="150"
            sortable
          />
          <el-table-column
            prop="operatingDate"
            label="運行日"
            min-width="100"
            sortable
          />
          <el-table-column
            prop="updatedDate"
            label="更新日"
            min-width="100"
            sortable
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick" type="text" size="small">編集 |</el-button>
              <el-button type="text" size="small"> 削除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <span style="margin-left: 3100px">すべてをチエック</span>
      </el-tab-pane>
      <el-tab-pane label="公開済み" name="2" class="p-8">
        <p>公開済み運行カレンダーを表示しています。</p>
        <p>+ 行を選択して運行官理に進んでください。</p>
        <el-table
          :data="tableData"
          :default-sort="{prop: 'date', order: 'descending'}"
          style="width: 600px"
        >
          <el-table-column
            prop="published"
            label="公開"
            min-width="80"
            sortable
          />
          <el-table-column
            prop="calendarId"
            label="カレンダーID"
            min-width="150"
            sortable
          />
          <el-table-column
            prop="operatingDate"
            label="運行日"
            min-width="100"
            sortable
          />
          <el-table-column
            prop="updatedDate"
            label="更新日"
            min-width="100"
            sortable
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick" type="text" size="small">編集 |</el-button>
              <el-button type="text" size="small"> 削除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      active: '1',
      tableData: [{
        published: '日',
        calendarId: 'NNNN',
        operatingDate: 'MM/DD(金)',
        updatedDate: 'MM/DD'
      },
      {
        published: '日',
        calendarId: 'NNNN',
        operatingDate: 'MM/DD(土)',
        updatedDate: 'MM/DD'
      },
      {
        published: '日',
        calendarId: 'NNNN',
        operatingDate: 'MM/DD(日)',
        updatedDate: 'MM/DD'
      },
      {
        published: '日',
        calendarId: 'NNNN',
        operatingDate: 'MM/DD(金)',
        updatedDate: 'MM/DD'
      }
      ],
      select: [],
      data: [
        {
          key: 1,
          label: 'メニューグループ'
        },
        {
          key: 2,
          label: '管理者グループ'
        }
      ],
      value: [2],
      radio: '1',
      checkList: [],
      activeDigit: 1
    }
  },
  methods: {
    handleClick() {
      console.log('click')
    },
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    next() {
      if (this.activeDigit++ < 6) this.active = this.activeDigit.toString()
    }
  }
}
</script>
<style scoped>
  .custom-input {
    border: 1px solid #DCDFE6;
    padding-left: 3px;
    width: 50px;
    border-radius: 4px;
    margin: 5px;
    height: 40px;
  }
</style>
