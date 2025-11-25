export const designTokens = {
  glassmorphism: {
    satin: {
      backdropFilter: 'blur(16px) saturate(180%)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    },
    matte: {
      backdropFilter: 'blur(24px)',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
    }
  },
  buttons: {
    base: {
      borderRadius: '12px',
      padding: '12px 24px',
      transition: 'all 0.3s ease',
    },
    primary: {
      // Aplicando glassmorfismo satinado
      backdropFilter: 'blur(16px)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      }
    },
    yellow: {
      // Amarillo traslúcido solicitado
      backdropFilter: 'blur(12px)',
      backgroundColor: 'rgba(255, 204, 0, 0.15)', // Amarillo con baja opacidad
      border: '1px solid rgba(255, 204, 0, 0.3)',
      color: '#FFCC00',
      boxShadow: '0 4px 20px rgba(255, 204, 0, 0.1)',
      '&:hover': {
        backgroundColor: 'rgba(255, 204, 0, 0.25)',
        boxShadow: '0 4px 25px rgba(255, 204, 0, 0.2)',
      }
    }
  }
};
