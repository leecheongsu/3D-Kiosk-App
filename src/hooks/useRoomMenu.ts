import { firestore } from '@lib/firebase';
import { useCallback, useEffect, useState } from 'react';
import firebase from 'firebase';
import { useSelector } from '@store';

export type UseRoomMenuProps = {
  roomId: string;
};
export type QueryResult<T = any> = {
  data: T;
  error: boolean;
  errorMessage?: string;
};
export default function useRoomMenu({
  roomId,
}: UseRoomMenuProps): [
  (id: string) => Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>,
  QueryResult,
] {
  const { exhibitionData } = useSelector((state) => state.exhibition);
  const [result, setResult] = useState<QueryResult | null>(null);
  useEffect(() => {
    if (roomId) {
      query(roomId)
        .then((querySnapshot) => {
          setResult({
            data: (!!querySnapshot?.size && querySnapshot.docs.map((item) => ({ id: item.id, ...item.data() }))) || [],
            error: false,
          });
        })
        .catch((e) => {
          setResult({ data: null, error: true, errorMessage: e });
        });
    }
  }, [roomId]);

  const query = useCallback(
    (id: string) => {
      return firestore()
        .collection('Exhibition')
        .doc(exhibitionData.id)
        .collection('RoomMenu')
        .where('roomId', '==', roomId)
        .where('isDeleted', '==', false)
        .orderBy('depth') // 0: 메인, 1: 하위
        .orderBy('order') // 메뉴 순서
        .get();
    },
    [roomId],
  );

  return [query, result];
}
