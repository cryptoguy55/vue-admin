<template>
  <div class="app-container">
    <p>ボックス席ごとに予約対象・予約外を設定できます。</p>
    <div>
      <img class="mx-auto" src="@/assets/seats.png" alt="seats">
      <el-form label-width="120px" :inline="true">
        <el-form-item label="車両">
          <el-select v-model="select" placeholder="選択してください">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="ボックス番号">
          <el-select v-model="select" placeholder="選択してください">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <el-form-item label="操作">
          <el-radio-group v-model="radio1">
            <el-radio-button label="1">予約対象とする</el-radio-button>
            <el-radio-button label="2">予約対象外とする</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio1: 1,
      select: ''
    }
  },
  methods: {

  }
}
</script>
