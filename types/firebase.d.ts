import * as FIREBASE from 'firebase'; // includes a definition for OrbitControls

declare module 'firebase' {
  namespace firestore {
    export interface Firestore {
      doc<T>(documentPath: string): DocumentReference<T>;
    }
    export interface Query<DataType = firestore.DocumentData> extends FIREBASE.firestore.Query {
      where(
        fieldPath: string | firestore.FieldPath,
        opStr: firestore.WhereFilterOp,
        value: any,
      ): Query<DataType>;
      orderBy(
        fieldPath: string | firestore.FieldPath,
        directionStr?: firestore.OrderByDirection,
      ): Query<DataType>;
      limit(limit: number): Query<DataType>;
      startAt(snapshot: DocumentSnapshot): Query<DataType>;
      startAt(...fieldValues: any[]): Query<DataType>;
      startAfter(snapshot: DocumentSnapshot): Query<DataType>;
      startAfter(...fieldValues: any[]): Query<DataType>;
      endBefore(snapshot: DocumentSnapshot): Query<DataType>;
      endBefore(...fieldValues: any[]): Query<DataType>;
      endAt(snapshot: DocumentSnapshot): Query<DataType>;
      endAt(...fieldValues: any[]): Query<DataType>;
      get(options?: firestore.GetOptions): Promise<QuerySnapshot<DataType>>;
      onSnapshot(observer: {
        next?: (snapshot: QuerySnapshot<DataType>) => void;
        error?: (error: Error) => void;
        complete?: () => void;
      }): () => void;
      onSnapshot(
        options: firestore.SnapshotListenOptions,
        observer: {
          next?: (snapshot: QuerySnapshot<DataType>) => void;
          error?: (error: Error) => void;
          complete?: () => void;
        },
      ): () => void;
      onSnapshot(
        onNext: (snapshot: QuerySnapshot<DataType>) => void,
        onError?: (error: Error) => void,
        onCompletion?: () => void,
      ): () => void;
      onSnapshot(
        options: firestore.SnapshotListenOptions,
        onNext: (snapshot: QuerySnapshot<DataType>) => void,
        onError?: (error: Error) => void,
        onCompletion?: () => void,
      ): () => void;
    }

    export interface DocumentSnapshot<DataType = firestore.DocumentData>
      extends firestore.DocumentSnapshot {
      data(options?: firestore.SnapshotOptions): DataType | undefined;
    }
    export interface QueryDocumentSnapshot<DataType = firestore.DocumentData>
      extends firestore.QueryDocumentSnapshot {
      data(options?: firestore.SnapshotOptions): DataType | undefined;
    }
    export interface QuerySnapshot<DataType = firestore.DocumentData>
      extends firestore.QuerySnapshot {
      readonly docs: QueryDocumentSnapshot<DataType>[];
    }
    export interface DocumentSnapshotExpanded<DataType = firestore.DocumentData> {
      exists: firestore.DocumentSnapshot['exists'];
      ref: firestore.DocumentSnapshot['ref'];
      id: firestore.DocumentSnapshot['id'];
      metadata: firestore.DocumentSnapshot['metadata'];
      data: DataType;
    }
    export interface QuerySnapshotExpanded<DataType = firestore.DocumentData> {
      metadata: {
        hasPendingWrites: firestore.QuerySnapshot['metadata']['hasPendingWrites'];
        fromCache: firestore.QuerySnapshot['metadata']['fromCache'];
      };
      size: firestore.QuerySnapshot['size'];
      empty: firestore.QuerySnapshot['empty'];
      docs: {
        [docId: string]: DocumentSnapshotExpanded<DataType>;
      };
    }
    export interface DocumentReference<DataType = firestore.DocumentData> {
      set(data: DataType, options?: firestore.SetOptions): Promise<void>;
      get(options?: firestore.GetOptions): Promise<DocumentSnapshot<DataType>>;
      onSnapshot(observer: {
        next?: (snapshot: DocumentSnapshot<DataType>) => void;
        error?: (error: firestore.FirestoreError) => void;
        complete?: () => void;
      }): () => void;
      onSnapshot(
        options: firestore.SnapshotListenOptions,
        observer: {
          next?: (snapshot: DocumentSnapshot<DataType>) => void;
          error?: (error: Error) => void;
          complete?: () => void;
        },
      ): () => void;
      onSnapshot(
        onNext: (snapshot: DocumentSnapshot<DataType>) => void,
        onError?: (error: Error) => void,
        onCompletion?: () => void,
      ): () => void;
      onSnapshot(
        options: firestore.SnapshotListenOptions,
        onNext: (snapshot: DocumentSnapshot<DataType>) => void,
        onError?: (error: Error) => void,
        onCompletion?: () => void,
      ): () => void;
      collection<T>(collectionPath: string): CollectionReference<T>;
    }

    export interface CollectionReference<DataType = firestore.DocumentData> {
      add(data: DataType): Promise<DocumentReference>;
      doc<T>(documentPath?: string): DocumentReference<T>;
    }
    export interface Collection<DataType = firestore.DocumentData> {
      [id: string]: DocumentSnapshotExpanded<DataType>;
    }
  }
}
