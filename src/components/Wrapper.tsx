import { Box } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {
  variant?: 'small' | 'regular';
}

const Wrapper: React.FC<WrapperProps> = ({ 
  children, 
  variant = 'regular' 
}) => {
    return (
      <Box 
        maxW={variant === 'regular' ? '800px' : '600px'} 
        mx={`auto`} 
        mt={8} 
        w={`100%`}
      >
        {children}
      </Box>
    );
}

export default Wrapper;