import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { FaUser, FaLock, FaSearch, FaEye } from 'react-icons/fa'; // Ejemplo de iconos

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'El componente `Input` permite a los usuarios introducir texto y datos. Es crucial para formularios de registro, búsqueda y edición en la "Fábrica de Páginas Web para Niños", diseñado para ser legible y fácil de usar.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Etiqueta descriptiva para el campo de entrada.',
    },
    placeholder: {
      control: 'text',
      description: 'Texto de marcador de posición cuando el campo está vacío.',
    },
    value: {
      control: 'text',
      description: 'Valor actual del campo de entrada.',
    },
    error: {
      control: 'text',
      description: 'Mensaje de error a mostrar debajo del campo.',
    },
    helperText: {
      control: 'text',
      description: 'Texto de ayuda o descripción.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desactiva el campo de entrada.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Si el campo ocupa todo el ancho disponible.',
    },
    leftIcon: {
      control: false,
      description: 'Icono a mostrar a la izquierda del campo.',
    },
    rightIcon: {
      control: false,
      description: 'Icono a mostrar a la derecha del campo.',
    },
    onChange: { action: 'changed', description: 'Callback al cambiar el valor del input.' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'url'],
      description: 'Tipo de input HTML.',
    },
  },
  args: { onChange: (e) => console.log(e.target.value) },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Nombre de usuario',
    placeholder: 'Introduce tu nombre',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'tu.email@ejemplo.com',
    helperText: 'No compartiremos tu email con nadie.',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Contraseña',
    placeholder: 'Introduce tu contraseña',
    error: 'La contraseña debe tener al menos 8 caracteres.',
    type: 'password',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Título de la página',
    placeholder: 'Mi primera página web',
    disabled: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Buscar',
    placeholder: 'Busca páginas o plantillas',
    leftIcon: <FaSearch />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Contraseña',
    placeholder: 'Introduce tu contraseña',
    rightIcon: <FaEye />,
    type: 'password',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Descripción de la página',
    placeholder: 'Cuentanos de qué trata tu página...',
    fullWidth: true,
    value: 'Esta es una página sobre mis mascotas.',
  },
  parameters: {
    layout: 'padded',
  },
};

export const TypePassword: Story = {
  args: {
    label: 'Nueva Contraseña',
    type: 'password',
    placeholder: '••••••••',
  },
};