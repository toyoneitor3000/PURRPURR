import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import { Upload, Scissors, Layers, CheckCircle } from 'lucide-react'; // Asumiendo lucide-react instalado (estaba en package.json)

export const StickerEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [cutLineColor, setCutLineColor] = useState('#EC4899'); // CMYK Pink default

  // Inicializar Fabric.js solo en cliente
  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 500,
        backgroundColor: '#f3f4f6', // surface-100
        selection: true,
      });
      setFabricCanvas(canvas);

      // Limpieza al desmontar
      return () => {
        canvas.dispose();
      };
    }
  }, [canvasRef, fabricCanvas]);

  // Manejar subida de imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && fabricCanvas) {
      const reader = new FileReader();
      reader.onload = (f) => {
        const data = f.target?.result as string;
        fabric.Image.fromURL(data, (img) => {
          // Escalar imagen para que quepa
          img.scaleToWidth(300);
          img.set({
             left: 100,
             top: 100,
             borderColor: cutLineColor,
             cornerColor: '#6366F1',
             cornerSize: 10,
             transparentCorners: false
          });
          fabricCanvas.add(img);
          fabricCanvas.setActiveObject(img);
          fabricCanvas.renderAll();
          setImageUploaded(true);
          
          // Simular "Trazo de Corte" (Stroke)
          // Nota: En un entorno real, esto se haría con trazado de vectores (potrace o similar)
          // Aquí simulamos visualmente agregando un borde al objeto imagen.
          // Fabric no soporta stroke directo en imágenes bitmap fácilmente sin filtros o wraps,
          // pero para MVP usaremos un Rect o Circle detrás o un filtro simple si fuera posible.
          // Para este MVP visual, usaremos el borde de selección como "guía".
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addCutLineSimulation = () => {
     if (!fabricCanvas) return;
     const activeObj = fabricCanvas.getActiveObject();
     if (activeObj) {
         // Simulación visual: Clonar la imagen, aplicar filtro de silueta (mock) o simplemente un borde grueso
         // Para MVP rápido: Añadir un borde de color al objeto seleccionado
         activeObj.set({
             stroke: cutLineColor,
             strokeWidth: 5,
             strokeUniform: true // Evita que el borde se escale raro
         });
         fabricCanvas.renderAll();
         alert('✅ Línea de corte generada (Simulación Visual)');
     }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Toolbar / Sidebar */}
      <div className="w-full lg:w-1/3 space-y-6 bg-white p-6 rounded-xl shadow-sm border border-surface-100">
        <div>
            <Typography variant="h3" className="mb-2">Configurar Diseño</Typography>
            <Typography variant="body" className="text-sm">Sube tu arte y verifica la línea de corte.</Typography>
        </div>

        {/* Upload */}
        <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:bg-surface-50 transition-colors">
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="hidden" 
                id="upload-sticker"
            />
            <label htmlFor="upload-sticker" className="cursor-pointer flex flex-col items-center gap-2">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Upload size={24} />
                </div>
                <span className="font-medium text-surface-900">Click para subir imagen</span>
                <span className="text-xs text-surface-900/50">PNG, JPG (Max 5MB)</span>
            </label>
        </div>

        {/* Actions */}
        <div className="space-y-3">
            <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={addCutLineSimulation}
                disabled={!imageUploaded}
            >
                <Scissors size={18} />
                Generar Línea de Corte
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" disabled>
                <Layers size={18} />
                Acabado (Holográfico)
            </Button>
        </div>

        <div className="pt-6 border-t border-surface-100">
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium">Precio estimado</span>
                <span className="text-xl font-bold text-primary">$0.00</span>
            </div>
            <Button variant="primary" className="w-full gap-2" disabled={!imageUploaded}>
                <CheckCircle size={18} />
                Aprobar y Agregar al Carrito
            </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="w-full lg:w-2/3 bg-surface-50 rounded-xl border border-surface-200 p-8 flex justify-center items-center overflow-hidden min-h-[600px]">
         <div className="relative shadow-2xl rounded-sm overflow-hidden bg-white">
             {/* Cuadrícula de fondo para referencia de tamaño (opcional) */}
             <div className="absolute inset-0 opacity-10 pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(#6366F1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
             </div>
             <canvas ref={canvasRef} />
         </div>
      </div>
    </div>
  );
};
