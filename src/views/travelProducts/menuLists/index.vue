<template>
  <div class="app-container">
    <p>メニューリストを表示しています。</p>
    <p class="my-4">+ メニューの新規登録はこちらからどうぞ。</p>
    <p class="mb-4">*「編集」を選択すると、メニューを表示・変更できます。</p>
    <p>*※「削除」を選択すると、確認ダイアログを表示します。</p>
    <el-button type="danger" class="float-right" icon="el-icon-document-add" circle @click="dialogVisible = true" />
    <el-table
      :data="tableData"
      :default-sort="{prop: 'date', order: 'descending'}"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="商品名"
        min-width="100"
        sortable
      />
      <el-table-column
        prop="stockQuantity"
        label="在庫数"
        min-width="100"
        sortable
      />
      <el-table-column
        prop="listPrice"
        label="表示価格"
        min-width="110"
        sortable
      />
      <el-table-column
        prop="inventoryNotification"
        label="在庫通知"
        min-width="110"
        sortable
      />
      <el-table-column
        prop="reservationNotification"
        label="予約通知"
        min-width="110"
        sortable
      />
      <el-table-column
        prop="closedNotification"
        label="手仕舞通知"
        min-width="130"
        sortable
      />
      <el-table-column
        prop="updateDate"
        label="更新日"
        min-width="100"
        sortable
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
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
      <p>旅行商品 >つ〇OO(D:NNNN) >メニューの編集</p>
      <el-tabs v-model="active" @tab-click="handleClick">
        <el-tab-pane label="基本設定" name="1" class="p-8">
          <el-form label-width="150px">
            <el-form-item label="商品名">
              <el-input placeholder="のつてたのしい列車のメニュー" style="width: 300px" />
            </el-form-item>
            <el-form-item label="任庫数 ">
              <el-input-number :min="1" />
            </el-form-item>
            <el-form-item label="手仕舞日時">
              <div>
                <p>手仕舞日時を過ぎざるとフロント側の予約を締め切ります。</p>
                <el-radio v-model="radio" label="1">連行</el-radio>
                <input class="custom-input" type="number">日前
                <input class="custom-input" type="number">時
                <input class="custom-input" type="number">分<br>
                <el-radio v-model="radio" label="2"> 運行日の出発時刻とする</el-radio>
                <el-radio v-model="radio" label="3">運行日の到着時刻とする</el-radio>
              </div>
            </el-form-item>
            <el-form-item label="大人格 ">
              <el-input-number :min="1" />&nbsp;&nbsp;円(税込)
            </el-form-item>
            <el-form-item label="アレルギー義務表示 ">
              <el-checkbox-group v-model="checkList" class="ml-4">
                <el-checkbox label="卵" />
                <el-checkbox label="乳" />
                <el-checkbox label="えび" />
                <el-checkbox label="かに" />
                <el-checkbox label="小麦" />
                <el-checkbox label="そば" />
                <el-checkbox label="落花生" />
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="在庫通知" name="2" class="p-8">
          在庫通知の条件を設定してください
          <div class="pl-8">
            <p class="my-8">在庫数が<input class="custom-input" type="number">&nbsp; になったとき通知する</p>
            <el-checkbox>在庫通知を利用しない</el-checkbox>
          </div>
        </el-tab-pane>
        <el-tab-pane label="予約状況通知" name="3" class="p-8">
          予約状況通知の条件を設定してください
          <div class="pl-8">
            <p class="my-8">
              予約状況通知ルール 運行日
              <input class="custom-input" type="number" value="30">&nbsp; 日前から短日
              <input class="custom-input" type="number" value="6">&nbsp; 時
              <input class="custom-input" type="number" value="0">&nbsp; 分に通知
            </p>
            <el-checkbox>予約通知を利用しない</el-checkbox>
          </div>
        </el-tab-pane>
        <el-tab-pane label="手仕舞通知" name="4" class="p-8">
          予約状況通知の条件を設定してください
          <div class="pl-8">
            <el-radio v-model="radio" label="1">手仁押日時に通知する</el-radio>
            <p class="pt-8 pb-16">
              <el-radio v-model="radio" label="2">運行日</el-radio>
              <input class="custom-input" type="number" value="5">日前
              <input class="custom-input" type="number" value="6">時
              <input class="custom-input" type="number" value="0">分に通知する
            </p>
            <el-checkbox>手仕舞通知を利用しない</el-checkbox>
          </div>
        </el-tab-pane>
        <el-tab-pane label="通知先設定" name="5" class="p-8">
          <p>通知先メールアドレスを選択してください。</p><br>
          <el-transfer
            v-model="value"
            :titles="['ユーザ管理>仕入元グループ', '登録先']"
            filter-placeholder="State Abbreviations"
            filterable
            :data="data"
            class="pl-12"
          />
        </el-tab-pane>
        <el-tab-pane label="フロント表示" name="6" class="p-8">
          <p>通知先メールアドレスを選択してください。</p><br>
          <div class="flex justify-between mb-8">
            <div>
              在庫ゼロのとき<br><br>
              <el-radio v-model="radio" label="1">商品名</el-radio><br><br>
              <el-radio v-model="radio" label="2">商品名(売り切れ)</el-radio><br><br>
              <el-radio v-model="radio" label="3">非表示</el-radio>
            </div>
            <div>
              在庫通知数のとき<br><br>
              <el-radio v-model="radio" label="1">商品名</el-radio><br><br>
              <el-radio v-model="radio" label="4">商品名(残りわずか)</el-radio>
            </div>
            <div>
              それ以外のとき<br><br>
              <el-radio v-model="radio" label="1">商品名</el-radio><br><br>
              <el-radio v-model="radio" label="5">商品名(おススメ)</el-radio>
            </div>
          </div>
          <el-checkbox>フロント表示を利用しない</el-checkbox>
        </el-tab-pane>
      </el-tabs>
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
      active: '1',
      tableData: [{
        name: '秋のディナーコース',
        stockQuantity: 'N個',
        listPrice: 'N円',
        inventoryNotification: 'N個',
        reservationNotification: '30日前毎日',
        closedNotification: 'N日前N時',
        updateDate: 'yyyy-mm-dd'
      },
      {
        name: 'お子様ディナー',
        stockQuantity: 'N個',
        listPrice: 'N円',
        inventoryNotification: 'N個',
        reservationNotification: '30日前毎日',
        closedNotification: 'N日前N時',
        updateDate: 'yyyy-mm-dd'
      },
      {
        name: 'お楽しみに弁当',
        stockQuantity: 'N個',
        listPrice: 'N円',
        inventoryNotification: 'N個',
        reservationNotification: '30日前毎日',
        closedNotification: 'N日前N時',
        updateDate: 'yyyy-mm-dd'
      },
      {
        name: 'ボトルワイン',
        stockQuantity: 'N個',
        listPrice: 'N円',
        inventoryNotification: 'N個',
        reservationNotification: '30日前毎日',
        closedNotification: 'N日前N時',
        updateDate: 'yyyy-mm-dd'
      },
      {
        name: '生ビール',
        stockQuantity: 'N個',
        listPrice: 'N円',
        inventoryNotification: 'N個',
        reservationNotification: '30日前毎日',
        closedNotification: 'N日前N時',
        updateDate: 'yyyy-mm-dd'
      },
      {
        name: 'ケーキ',
        stockQuantity: 'N個',
        listPrice: 'N円',
        inventoryNotification: 'N個',
        reservationNotification: '30日前毎日',
        closedNotification: 'N日前N時',
        updateDate: 'yyyy-mm-dd'
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
