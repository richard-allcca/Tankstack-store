import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useProductMutation from "../hooks/useProductMutation";

export interface FormInputs {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const NewProduct = () => {

  const productMutation = useProductMutation();

  // NOTE - En este caso en lugar de usar 'register' usaremos 'control' debido a que estamos usando componentes de NextUI que no son compatibles directamente con 'register'.
  // Si estuviéramos usando componentes nativos de HTML, podríamos usar 'register' directamente.
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      title: 'Teclado mecánico RGB',
      price: 99.99,
      description: 'Teclado mecánico de alta calidad con retroiluminación RGB y diseño ergonómico. Ideal para gamers y profesionales.',
      category: "men's clothing",
      image: 'https://m.media-amazon.com/images/I/71FSIp+tDNL._AC_SL1500_.jpg'
    }
  });

  console.log('Errores de formulario:', errors); // Para depurar posibles errores

  const newImage = watch('image'); // NOTE - Esto es para que el componente se re-renderice cuando cambie la imagen


  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    // alert('Producto enviado correctamente, revisa la consola para más detalles');
    // Aquí podrías hacer una petición a tu API para crear el producto
    productMutation.mutate(data);
  };

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>

        <div className="flex justify-around items-center">

          <div className="flex-col w-[500px]">

            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input value={field.value} onChange={field.onChange} className="mt-2" type="text" label="Titulo del producto" />
              )}
            />

            <Controller
              name="price"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value.toString()}
                  // onChange={(e) => field.onChange(Number(e.target.value))}
                  onChange={ ev => field.onChange( +ev.target.value )}
                  className="mt-2"
                  type="number"
                  label="Precio del producto"
                />
              )}
            />

            <Controller
              name="image"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input value={field.value} onChange={field.onChange} className="mt-2" type="url" label="Url del producto" />
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea value={field.value} onChange={field.onChange} className="mt-2" label="Descripcion del producto" />
              )}
            />

            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <select {...field} className="rounded-md p-3 mt-2 bg-gray-800 w-full">
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <br />

            <Button
              type='submit'
              className="mt-2"
              color="primary"
              isDisabled={productMutation.isPending}
              isLoading={productMutation.isPending}
            >
              {productMutation.isPending ? 'Creando producto...' : 'Crear producto'}
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-10 flex items-center" style={{
            width: '500px',
            height: '600px',
          }}>

            <Image
              // src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
              src={newImage}
            />
          </div>

        </div>


      </form>

    </div>
  );
};