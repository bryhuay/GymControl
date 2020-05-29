export default {
  items: [
    
    {
      title: true,
      name: 'CLIENTES LIBRES',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    
    {
      name: 'Nuevo cliente',
      url: '/Clientes/Registrar',
      icon: 'icon-pencil',
    },
    {
      name: 'Asistencia cliente',
      url: '/Clientes/Buscar',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: 'MATRICULAS',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    
    {
      name: 'Miembros',
      url: '/Membresias',
      icon: 'icon-pencil',
    },
    {
      name: 'Nueva matricula',
      url: '/Membresias/Registrar',
      icon: 'icon-pencil',
    },
    {
      name: 'Buscar Miembros',
      url: '/Membresias/Buscar',
      icon: 'icon-pencil',
    },
    
    {
      name: 'Miembros cancelados',
      url: '/Membresias/Vencidas',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: 'VENTAS EXTRAS',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Ventas',
      url: '/Ventas',
      icon: 'icon-pencil',
    },
    {
      name: 'Nueva venta',
      url: '/Ventas/Registrar',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: 'REPORTES CAJA',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    
    {
      name: 'Total de caja por dia',
      url: '/Ventas/Buscar',
      icon: 'icon-pencil',
    },
  
    
  ],
};
