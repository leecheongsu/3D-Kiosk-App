// 각 스테이터스 별로 loading: 로딩중인지, done: 처리가 끝났는지,
// error: 에러가 있는지 (에러가 있으면 에러메세지로 설정)을 확인할 수 있다
export type ActionStatus = {
  loading: boolean;
  done: boolean;
  error: string | null;
};

export const createStatus = (): ActionStatus => ({
  loading: false,
  done: false,
  error: null,
});
export const resetStatus = (): ActionStatus => ({
  loading: false,
  done: false,
  error: null,
});

export const createRequestStatus = (): ActionStatus => ({
  loading: true,
  error: null,
  done: false,
});
export const createSuccessStatus = (): ActionStatus => ({
  loading: false,
  error: null,
  done: true,
});
export const createFailureStatus = (error: any): ActionStatus => ({
  loading: false,
  done: false,
  error,
});
