<template>
  <div class="column is-6">
    <div class="card">
      <div class="card-header">
        <div class="columns" style="width: 100%">
          <div class="column">
            <div class="is-flex is-justify-content-space-between my-3">
              <span class="ml-4">스포츠 기본설정</span>
              <span class="icon"><i class="fas fa-home"></i></span>
            </div>
            <div class="is-flex is-justify-content-space-between mt-5 mb-2">
              <div class="ml-4">
                <span class="icon"> <i class="fas fa-home"></i></span
                ><span>스페셜 설정</span>
              </div>
              <span class="icon"><i class="fas fa-home"></i></span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="content">
          <div class="field my-4 is-flex is-justify-content-space-between">
            <label for=""
              >유저페이지에서 경기 시작 몇분전에 리스트에서 사라지는가?</label
            >
            <div class="sixty">
              <input class="input" type="number" />
            </div>
          </div>
          <div class="field my-4 is-flex is-justify-content-space-between">
            <label for="">배팅가능 배당제한:</label>
            <div class="sixty">
              <input class="input" type="number" />
            </div>
          </div>
          <div class="field my-4 is-flex is-justify-content-space-between">
            <label for="">최대 배팅가능 폴더:</label>
            <div class="sixty">
              <input class="input" type="number" />
            </div>
          </div>
          <div class="field my-4 is-flex is-justify-content-space-between">
            <label for="">배팅 후 몇분전까지 취소 가능한가?</label>
            <div class="sixty">
              <input class="input" type="number" />
            </div>
          </div>
          <div class="field my-4 is-flex is-justify-content-space-between">
            <label for="">배팅 후 경기시작 몇분전까지 취소 가능한가?</label>
            <div class="sixty">
              <input class="input" type="number" />
            </div>
          </div>
          <div class="field my-4 is-flex is-justify-content-space-between">
            <label for="">일일 배팅 취소 가능 횟수</label>
            <div class="sixty">
              <input class="input" type="number" />
            </div>
          </div>
          <div class="field my-4 is-flex is-justify-content-space-around">
            <div class="mr-4">
              <span>4폴더 보너스 배당:</span>
              <input class="input" type="text" />
            </div>
            <div class="mr-4">
              <span>5폴더 보너스 배당</span>
              <input class="input" type="text" />
            </div>
            <div>
              <span>6폴더 보너스 배당:</span>
              <input class="input" type="text" />
            </div>
          </div>
          <div class="field my-4">
            <div>
              <span>최소배당:</span>
              <input class="column is-one-third input" type="text" />
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer is-flex-direction-row-reverse">
        <div class="m-5">
          <button class="button is-info is-outlined is-pulled-right">
            스포츠 기본설정 수정
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.sixty {
  width: 60%;
}
</style>
