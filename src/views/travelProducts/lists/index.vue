<template>
  <div class="app-container">
    <p>旅行商品リストを表示しています。</p>
    <el-button type="danger" class="float-right" icon="el-icon-document-add" circle @click="dialogVisible = true" />
    <el-table
      :data="tableData"
      :default-sort="{prop: 'date', order: 'descending'}"
      style="width: 100%"
    >
      <el-table-column
        prop="tripId"
        label="旅行ID"
        min-width="110"
        sortable
      />
      <el-table-column
        prop="name"
        label="商品名"
        min-width="100"
        sortable
      />
      <el-table-column
        prop="departureStation"
        label="出発駅"
        min-width="100"
        sortable
      />
      <el-table-column
        prop="departureTime"
        label="出発時刻"
        min-width="110"
        sortable
      />
      <el-table-column
        prop="arrivalStation"
        label="到着駅"
        min-width="100"
        sortable
      />
      <el-table-column
        prop="arrivalTime"
        label="到着"
        min-width="80"
        sortable
      />
      <el-table-column
        prop="startDate"
        label="開始日"
        min-width="100"
        sortable
      />
      <el-table-column
        prop="endDate"
        label="終了日"
        min-width="100"
        sortable
      />
      <el-table-column
        prop="updateDate"
        label="更新日時"
        min-width="110"
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
    <el-dialog
      title="旅行商品 > 新規登録"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
    >
      <el-steps :active="active" align-center finish-status="success" class="mb-4">
        <el-step title="基本情報" />
        <el-step title="メニューの選択" />
        <el-step title="運行カレンダーの登録" />
      </el-steps>
      <el-form v-if="active===0" label-width="120px">
        <el-form-item label="旅行商品名">
          <el-input placeholder="旅行商品名を入力してください" style="width: 189px" />
        </el-form-item>
        <el-form-item label="年失">
          <el-select v-model="select" placeholder="旅行商品名を入力してください">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="価格 ">
          <el-input-number :min="1" />&nbsp;&nbsp;円(税込)
        </el-form-item>
      </el-form>
      <div v-if="active===1" label-width="120px">
        <p>旅行商品>新規登録>メニューの選択</p><br>
        <el-transfer
          v-model="value"
          :titles="['登録済みメニューのリスト', '選択したメニュー']"
          filter-placeholder="State Abbreviations"
          filterable
          :data="data"
          class="pl-20"
        />
      </div>
      <div v-if="active===2" label-width="120px" class="flex flex-col">
        <p class="my-4">運行カレンダーを登録してください。運行カレンダーは承認されるまでウェブ上で公開されません。</p>
        <el-radio v-model="radio" label="1">期間で登録</el-radio>
        <el-date-picker
          type="daterange"
          range-separator="~"
          start-placeholder="開始日"
          end-placeholder="終了日"
          class="ml-8 my-4"
        />
        <div class="flex ml-4 mb-4">
          曜日指定
          <el-checkbox-group v-model="checkList" class="ml-4">
            <el-checkbox label="月曜日" />
            <el-checkbox label="火曜日" />
            <el-checkbox label="水曜日" />
            <el-checkbox label="木曜日" />
            <el-checkbox label="土曜日" />
            <el-checkbox label="日曜日" />
          </el-checkbox-group>
        </div>
        <el-radio v-model="radio" label="2">日付指定で登録</el-radio>
        <el-date-picker type="date" class="ml-40 my-4" />
        <el-input placeholder="カレンダーで日付を選択してください。複数選択可" style="width: 380px" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">キャンセル</el-button>
        <el-button @click="next">次へすすむ ></el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      active: 0,
      options: [{
        value: 'Option1',
        label: '経路を選択してください ヤ'
      }, {
        value: 'Option2',
        label: 'Option2'
      }],
      tableData: [{
        tripId: "NNNN",
        name: 'メニュー',
        departureStation: "メニュー",
        departureTime: "10時11分",
        arrivalStation: "洒",
        arrivalTime: "13時20分",
        startDate: "MM/DD",
        endDate: "MM/DD",
        updateDate: "MM/DD",
      },
      {
        tripId: "NNNN",
        name: 'メニュー',
        departureStation: "メニュー",
        departureTime: "9時11分",
        arrivalStation: "洒",
        arrivalTime: "14時20分",
        startDate: "MM/DD",
        endDate: "MM/DD",
        updateDate: "MM/DD",
      }],
      select: [],
      data: [
        {
          key: 1,
          label: '秋のディナーコース'
        },
        {
          key: 2,
          label: 'お子様ディナー'
        },
        {
          key: 3,
          label: 'お楽しみに弁当'
        },
        {
          key: 4,
          label: '生ビール'
        },
        {
          key: 5,
          label: 'ケーキ'
        },
        {
          key: 6,
          label: '秋のディナーコース'
        }
      ],
      value: [6],
      radio: 0,
      checkList: []
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
      if (this.active++ > 2) this.active = 0
    }
  }
}
</script>
