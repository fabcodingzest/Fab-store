import Icon from '@chakra-ui/icon';
import { Text } from '@chakra-ui/layout';
import { FiAlertTriangle } from 'react-icons/fi';

const FormValidationMsg = ({ errorMsg }) => {
  return (
    <Text color="red" mt={2}>
      <Icon mr="2" fontSize={18} as={FiAlertTriangle} />
      {errorMsg}
    </Text>
  );
};

export default FormValidationMsg;
