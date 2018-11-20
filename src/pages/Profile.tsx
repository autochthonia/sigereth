import React, { useMemo, useRef } from 'react';
import useFirestore from 'services/useFirestore';
import { createFSUserRef } from 'services/fsSelector';
import { getUID } from 'services/firestation';
import Flex from 'atoms/Flex';
import { User } from 'types/User';
import Input from 'atoms/Input';
import { firestore } from 'firebase';

const ProfilePage = () => {
  const firestoreUserRef = useMemo(() => createFSUserRef(getUID()), [
    getUID(),
  ]) as firestore.DocumentReference<User>;
  const profile = useFirestore(firestoreUserRef);

  if (profile.data === null) {
    return 'loading...';
  }

  if (profile.exists === false) {
    return 'error, record doesn\'t exist';
  }

  return (
    <Flex>
      <Input
        value={profile.data.username}
        placeholder={'Username'}
        onChange={e => {
          firestoreUserRef.set({ username: e.target.value }, { merge: true });
        }}
        name="username"
      />
    </Flex>
  );
};

export default ProfilePage;
