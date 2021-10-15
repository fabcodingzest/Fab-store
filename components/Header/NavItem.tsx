import Icon from '@chakra-ui/icon';
import { Flex, FlexProps } from '@chakra-ui/layout';
import { ReactText } from 'react';
import { IconType } from 'react-icons/lib';
import Link from 'next/link';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  onClose: () => void;
}
const NavItem = ({ icon, children, onClose, ...rest }: NavItemProps) => {
  return (
    <Link href="/resetpassword">
      <Flex
        onClick={() => onClose()}
        align="center"
        p={2}
        pl={4}
        role="group"
        cursor="pointer"
        color="gray.200"
        _hover={{
          bg: 'gray.200',
          color: 'gray.800',
        }}
        {...rest}
        fontSize="xs"
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="14"
            _groupHover={{
              color: 'gray.800',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
