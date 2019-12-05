import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastActionsCreators } from 'react-native-redux-toast';

import api from '~/services/api';

import DefaultLayout from '~/pages/_layouts';
import Button from '~/components/Button';

import { InputQuestion } from './styles';

export default function Question({ navigation }) {
  const dispatch = useDispatch();

  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const id = useSelector(state => state.auth.student.id);

  async function handleSubmit() {
    try {
      setLoading(true);
      await api.post(`students/${id}/help-orders`, {
        question,
      });

      dispatch(
        ToastActionsCreators.displayWarning('Request for assistance sent', 3000)
      );
      navigation.navigate('Help');
    } catch (err) {
      dispatch(
        ToastActionsCreators.displayError(err.response.data.error, 3000)
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DefaultLayout GoBack page="Help">
      <InputQuestion
        textAlignVertical="top"
        numberOfLines={15}
        placeholder="Include your request for assistance"
        multiline
        value={question}
        onChangeText={setQuestion}
      />
      <Button loading={loading} onPress={handleSubmit}>
        Send request
      </Button>
    </DefaultLayout>
  );
}
