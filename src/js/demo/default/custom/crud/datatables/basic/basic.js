var DatatablesBasicBasic = (function () {
  var initTable1 = function () {
    var table = $('#m_table_1');

    // begin first table
    table.DataTable({
      responsive: true,

      //== DOM Layout settings
      dom: `<'row' f<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,

      lengthMenu: [5, 10, 25, 50],

      pageLength: 10,

      language: {
        lengthMenu: '每页 _MENU_ 条记录',
        zeroRecords: '没有找到记录',
        info: '第 _PAGE_ 页 ( 总共 _PAGES_ 页 )',
        infoEmpty: '无记录',
        infoFiltered: '(从 _MAX_ 条记录过滤)',
      },

      //== Order settings
      order: [
        [1, 'desc']
      ],

      headerCallback: function (thead, data, start, end, display) {
        thead.getElementsByTagName('th')[0].innerHTML = `
                    <label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--brand">
                        <input type="checkbox" value="" class="m-group-checkable">
                        <span></span>
                    </label>`;
      },

      columnDefs: [{
          targets: 0,
          width: '30px',
          className: 'dt-right',
          orderable: false,
          render: function (data, type, full, meta) {
            return `
                        <label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--brand">
                            <input type="checkbox" value="" class="m-checkable">
                            <span></span>
                        </label>`;
          },
        },
        {
          targets: -1,
          title: 'Actions',
          orderable: false,
          render: function (data, type, full, meta) {
            return `
                        <a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="View">
                          <i class="la la-edit"></i>
                        </a>
                        <a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="View">
                          <i class="la la-trash"></i>
                        </a>`;
          },
        },
        {
          targets: 8,
          render: function (data, type, full, meta) {
            var status = {
              1: {
                title: 'Pending',
                class: 'm-badge--brand',
              },
              2: {
                title: 'Delivered',
                class: ' m-badge--metal',
              },
              3: {
                title: 'Canceled',
                class: ' m-badge--primary',
              },
              4: {
                title: 'Success',
                class: ' m-badge--success',
              },
              5: {
                title: 'Info',
                class: ' m-badge--info',
              },
              6: {
                title: 'Danger',
                class: ' m-badge--danger',
              },
              7: {
                title: 'Warning',
                class: ' m-badge--warning',
              },
            };
            if (typeof status[data] === 'undefined') {
              return data;
            }
            return (
              '<span class="m-badge ' +
              status[data].class +
              ' m-badge--wide">' +
              status[data].title +
              '</span>'
            );
          },
        },
        {
          targets: 9,
          render: function (data, type, full, meta) {
            var status = {
              1: {
                title: 'Online',
                state: 'danger',
              },
              2: {
                title: 'Retail',
                state: 'primary',
              },
              3: {
                title: 'Direct',
                state: 'accent',
              },
            };
            if (typeof status[data] === 'undefined') {
              return data;
            }
            return (
              '<span class="m-badge m-badge--' +
              status[data].state +
              ' m-badge--dot"></span>&nbsp;' +
              '<span class="m--font-bold m--font-' +
              status[data].state +
              '">' +
              status[data].title +
              '</span>'
            );
          },
        },
      ],
    });

    table.on('change', '.m-group-checkable', function () {
      var set = $(this).closest('table').find('td:first-child .m-checkable');
      var checked = $(this).is(':checked');

      $(set).each(function () {
        if (checked) {
          $(this).prop('checked', true);
          $(this).closest('tr').addClass('active');
        } else {
          $(this).prop('checked', false);
          $(this).closest('tr').removeClass('active');
        }
      });
    });

    table.on('change', 'tbody tr .m-checkbox', function () {
      $(this).parents('tr').toggleClass('active');
    });
  };

  return {
    //main function to initiate the module
    init: function () {
      initTable1();
    },
  };
})();

jQuery(document).ready(function () {
  DatatablesBasicBasic.init();
});