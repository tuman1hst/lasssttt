    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "UA-162188897-1");
    var copyright = document.getElementById('copyright-year');
    var copyrightYear = new Date().getFullYear();
    copyright.innerHTML = copyrightYear;
    var lastRefreshTime = localStorage.getItem('lastRefreshTime');
    if (lastRefreshTime) {
      var $button = $("#refreshButton");
      var $icon = $button.find('.icon-refresh');
      var $text = $button.find('.text');
      $button.prop('disabled', true);
      $icon.css('opacity', '0.5');
      $button.css('opacity', '0.5');
      $button.css('cursor', 'default');
      setTimeout(function() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - lastRefreshTime;
        const remainingTime = Math.max(10 * 60 * 1000 - elapsedTime, 0);
        setTimeout(function() {
          $button.prop('disabled', false)
              .css('opacity', '1')
              .css('cursor', 'pointer');
          $icon.css('opacity', '1');
          localStorage.removeItem('lastRefreshTime');
        }, remainingTime);
      }, 10000);
    }

    function toEditProfile() {
      window.location.href = '/profile/edit'
    }


    $(document).ready(function() {
      $("#refreshButton").click(function(e) {
        e.preventDefault();
        var $button = $(this);
        var $icon = $button.find('.icon-refresh');
        var $text = $button.find('.text');

        $text.hide();
        $button.prop('disabled', true);
        $icon.css('margin-left', 'auto');
        $icon.css('margin-right', 'auto');
        $icon.css('animation', 'rotate 6s forwards');

        $.ajax({
          url: "/home/refresh",
          type: "GET",
          success: function(data) {
            $("#countStudent").text(data.countStudent);
            $("#countTeacher").text(data.countTeacher);
            $("#countParent").text(data.countParent);
            setTimeout(function() {
              $text.show();
              $icon.css('margin-left', '');
              $icon.css('margin-right', '');
              $icon.css('animation', '');
              $icon.css('opacity', '0.5');
              $button.css('opacity', '0.5');
              $button.css('cursor', 'default');
            }, 6000);
            localStorage.setItem('lastRefreshTime', Date.now());
          },
          error: function(xhr, status, error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Permintaan Anda tidak dapat diproses. Mohon coba beberapa saat lagi.',
              customClass: {
                confirmButton: "btn s-btn-green rounded-pill text-uppercase font-weight-bold px-5",
              },
            });

            $text.show();
            $button.prop('disabled', false);
            $icon.css('margin-left', '');
            $icon.css('margin-right', '');
            $icon.css('animation', '');
          }
        });
      });
    });

    const animData = function (el) {
        const data = {
            container: el, // required
            path: "https://dashboard.skul.id/images/assets/animation/empty-data.json",
            renderer: 'svg', // required
            loop: true, // optional
            autoplay: true, // optional
            name: "No Data Animation", // optional
        }
        return data;
    }
    const animation1 = bodymovin.loadAnimation(animData(document.getElementById('empty__grade')));
    const animation2 = bodymovin.loadAnimation(animData(document.getElementById('empty__chat')));
    const animation3 = bodymovin.loadAnimation(animData(document.getElementById('empty__schedule')));

    function triggerDatePicker(id) {
        $(id).click();
    }

    function sum(arr) {
        return arr.reduce((prev, next) => prev + next);;
    }
    const arrow = {
        left: `<img src=https://dashboard.skul.id/images/assets/icons/ic_chevron_left.svg alt="left" />`,
        right: `<img src=https://dashboard.skul.id/images/assets/icons/ic_chevron_right.svg alt="right" />`
    };
    const dataTableOptions = {
        language: {
            "sEmptyTable": "Belum ada data yang tersedia pada tabel ini",
            "sProcessing": "Sedang memproses...",
            "sLengthMenu": " _MENU_ ",
            "sZeroRecords": "Tidak ditemukan data yang sesuai",
            "sInfo": "Menampilkan _START_ sampai _END_ dari _TOTAL_ entri",
            "sInfoEmpty": "Menampilkan 0 sampai 0 dari 0 entri",
            "sInfoFiltered": "(disaring dari _MAX_ entri keseluruhan)",
            "sSearch": "",
            "searchPlaceholder": "Ketik untuk mencari..",
            "oPaginate": {
                "sFirst": "",
                "sPrevious": arrow.left,
                "sNext": arrow.right,
                "sLast": ""
            }
        },
        searching: false,
        pageLength: 5,
        pagingType: "simple_numbers",
        info: false,
        dom: `<'row '<' col d-none'B>>
                <'row no-gutters'<'col-sm-12 rounded overflow-auto't>>
                    <'row'<'col-sm-5 my-3 mb-md-0'i>
                        <'col-sm-7 mt-0 mt-md-3'p>>`,
    }

    $(document).ready(function () {
        function checkIsDataTable(selector, ) {
            if ($.fn.DataTable.isDataTable(selector)) {
                return true;
            }
            return false
        }

        function destroyDataTable(selector) {
            switch (selector) {
                // variable name
                case 'attendanceTable':
                    $('#attendanceTable').dataTable().fnDestroy();
                    break;
                case 'ebookTable':
                    $('#ebookTable').dataTable().fnDestroy();
                    break;
                case 'articleTable':
                    $('#articleTable').dataTable().fnDestroy();
                    break;
                case 'permitTable':
                    $('#permitTable').dataTable().fnDestroy();
                    break;
                case 'teacherPermitTable':
                    $('#teacherPermitTable').dataTable().fnDestroy();
                    break;
                default:
                    break;
            }
        }

        function spinnerTransaction() {
            let spinner = `
                  <div class="spinner-border spinner-border-sm" role="status">
                      <span class="sr-only">Loading...</span>
                  </div>`;

            $('#articleTotal').html(spinner);
            $('#chatTotal').html(spinner);
            $('#ebookTotal').html(spinner);
            $('#gradeTotal').html(spinner);
            $('#scheduleTotal').html(spinner);

            $('#attendanceTotal').html(spinner);
            $('#attendanceTable > tbody').empty();
            $('#attendanceTable > tbody').append(`<tr>
                    <td colspan="7" class="text-center">${spinner}</td>
                </tr>`);

            $('#permitTotal').html(spinner);
            $('#permit .successPermitTotal').html(spinner);

            $('#permitTable > tbody').empty();
            $('#permitTable > tbody').append(`<tr>
                    <td colspan="5" class="text-center">${spinner}</td>
                </tr>`);

            $('#ebookTable > tbody').empty();
            $('#ebookTable > tbody').append(`<tr>
                    <td colspan="3">${spinner}</td>
                </tr>`);
            $('#articleTable > tbody').empty();
            $('#articleTable > tbody').append(`<tr>
                    <td colspan="3">${spinner}</td>
                </tr>`);
        }

        function drawTablePermit(arr = []) {
            if (checkIsDataTable('#permitTable')) destroyDataTable('permitTable')
            $('#permitTable > tbody').empty();
            $('#permitTable > tfoot').remove();

            let permitRows = '';
            if (arr.length) {
                permitRows = arr.map(v => `
                 <tr>
                    <td class="text-center" data-sort=${v.date.split('-').join('')}>
                        ${v.date.split('-').reverse().join('/')}</td>
                     <td class="text-center">${v.success}</td>
                     <td class="text-center">${v.rejected}</td>
                     <td class="text-center">${v.pending}</td>
                     <td class="text-center">${v.total}</td>
                 </tr>
                `).join();
            }

            $('#permitTable > tbody').append(permitRows !== "" ? permitRows :
                `<tr>
                        <td colspan='5' class="text-center" >Belum ada data yang tersedia.</td>
                    </tr>`);


            if (arr.length) {
                $('#permitTable > tbody').after(
                    `<tfoot>
                            <tr style="background: #D9F5FF;" class="no-sort">
                                <td class="text-center"><b>Total</b></td>
                                <td class="text-center">
                                    ${sum(arr.map(v => v.success))}
                                </td>
                                <td class="text-center">
                                    ${sum(arr.map(v => v.rejected))}
                                </td>
                                <td class="text-center">
                                    ${sum(arr.map(v => v.pending))}
                                </td>
                                <td class="text-center">
                                    ${sum(arr.map(v => v.total))}
                                </td>
                            </tr>
                        </tfoot>`
                );
            }

            if (permitRows !== '') {
                $('#permitTable').DataTable({
                    ...dataTableOptions,
                    buttons: [{
                        extend: 'excelHtml5',
                        text: 'Excel',
                        footer: true,
                        exportOptions: {
                            stripHtml: true,
                            columns: [0, 1, 2, 3, 4]
                        }
                    }, ],
                    "order": [
                        [0, "desc"]
                    ],
                    "fnDrawCallback": function (oSettings) {
                        if ($(
                                '#permitTable_wrapper .dataTables_paginate ul li.paginate_button:not(.disabled)'
                            )
                            .length > 1) {
                            $('#permitTable_wrapper .dataTables_paginate')[0].style.display =
                                "block";
                        } else {
                            $('#permitTable_wrapper .dataTables_paginate')[0].style.display =
                                "none";
                        }
                    }
                });
            }
        }

        function drawTableEbook(arr = []) {
            if (checkIsDataTable('#ebookTable')) destroyDataTable('ebookTable')
            $('#ebookTable > tbody').empty();
            $('#ebookTable > tfoot').remove();

            let ebookTableRows = "";
            if (arr.length) {
                ebookTableRows = arr.map(v => `
                 <tr>
                    <td class="text-center" data-sort=${v.date.split('-').join('')}>
                        ${v.date.split('-').reverse().join('/')}</td>
                     <td class="text-center">${v.total}</td>
                     <td class="text-center">${v.unique_visitor}</td>
                 </tr>
                `).join();
            }

            $('#ebookTable > tbody').append(ebookTableRows !== "" ? ebookTableRows :
                `<tr> <td colspan='3' class="text-center">Belum ada data yang tersedia.</td> </tr>`);

            if (arr.length) {
                $('#ebookTable > tbody').after(`
                    <tfoot>
                  <tr style="background: #D9F5FF;" class="no-sort" >
                      <td class="text-center"><b>Total</b></td>
                      <td class="text-center">
                          ${sum(arr.map(d => d.total))}
                      </td>
                      <td class="text-center">
                          ${sum(arr.map(d => d.unique_visitor))}
                      </td>
                  </tr>
                </tfoot>`);
            }

            if (ebookTableRows !== '') {
                $('#ebookTable').DataTable({
                    ...dataTableOptions,
                    buttons: [{
                        extend: 'excelHtml5',
                        text: 'Excel',
                        footer: true,
                        exportOptions: {
                            stripHtml: true,
                            columns: [0, 1, 2]
                        }
                    }, ],
                    "order": [
                        [0, "desc"]
                    ],
                    "fnDrawCallback": function (oSettings) {
                        if ($(
                                '#ebookTable_wrapper .dataTables_paginate ul li.paginate_button:not(.disabled)'
                            )
                            .length > 1) {
                            $('#ebookTable_wrapper .dataTables_paginate')[0].style.display =
                                "block";
                        } else {
                            $('#ebookTable_wrapper .dataTables_paginate')[0].style.display =
                                "none";
                        }
                    }
                });
            }
        }

        function drawTableArticle(arr = []) {
            if (checkIsDataTable('#articleTable')) destroyDataTable('articleTable')
            $('#articleTable > tbody').empty();
            $('#articleTable > tfoot').remove();

            let articleTableRows = "";

            if (arr.length) {
                articleTableRows = arr.map(v => `
                    <tr>
                        <td class="text-center" data-sort=${v.date.split('-').join('')}>
                            ${v.date.split('-').reverse().join('/')}</td>
                        <td class="text-center">${v.total}</td>
                        <td class="text-center">${v.unique_visitor}</td>
                    </tr>
                    `).join();
            }


            $('#articleTable > tbody').append(articleTableRows !== "" ? articleTableRows :
                `<tr> <td colspan='3' class="text-center">Belum ada data yang tersedia.</td> </tr>`);

            if (arr.length) {
                $('#articleTable > tbody').after(`
                    <tfoot>
                  <tr style="background: #D9F5FF;" class="no-sort">
                      <td class="text-center"><b>Total</b></td>
                      <td class="text-center">
                          ${sum(arr.map(d => d.total))}
                      </td>
                      <td class="text-center">
                          ${sum(arr.map(d => d.unique_visitor))}
                      </td>
                  </tr>
                </tfoot>`);
            }

            if (articleTableRows !== '') {
                $('#articleTable').DataTable({
                    ...dataTableOptions,
                    buttons: [{
                        extend: 'excelHtml5',
                        text: 'Excel',
                        footer: true,
                        exportOptions: {
                            stripHtml: true,
                            columns: [0, 1, 2, ]
                        }
                    }, ],
                    "order": [
                        [0, "desc"]
                    ],
                    "fnDrawCallback": function (oSettings) {
                        if ($(
                                '#articleTable_wrapper .dataTables_paginate ul li.paginate_button:not(.disabled)'
                            )
                            .length > 1) {
                            $('#articleTable_wrapper .dataTables_paginate')[0].style.display =
                                "block";
                        } else {
                            $('#articleTable_wrapper .dataTables_paginate')[0].style.display =
                                "none";
                        }
                    }
                });
            }
        }

        function drawTableAttendance(arr = [], total) {
            if (checkIsDataTable('#attendanceTable')) destroyDataTable('attendanceTable')
            $('#attendanceTable > tbody').empty();
            $('#attendanceTable > tfoot').remove();

            let attendanceTableRows = '';
            if (arr.length) {
                attendanceTableRows = arr.map(v => `
                    <tr>
                        <td class="text-center" data-sort=${v.date.split('-').join('')}>
                            ${v.date.split('-').reverse().join('/')}</td>
                        <td class="text-center">${v.clock_in_attempt}</td>
                        <td class="text-center">${v.clock_in_valid}</td>
                        <td class="text-center">${v.clock_in_invalid}</td>
                        <td class="text-center">${v.clock_out_attempt}</td>
                        <td class="text-center">${v.clock_out_valid}</td>
                        <td class="text-center">${v.clock_out_invalid}</td>
                    </tr>
                    `).join();
            }

            $('#attendanceTable > tbody').append(attendanceTableRows !== "" ? attendanceTableRows :
                `<tr>
                    <td colspan='7' class="text-center">Belum ada data yang tersedia.</td>
                </tr>`);


            if (arr.length) {
                $('#attendanceTable > tbody').after(`
                    <tfoot>
                        <tr style="background: #D9F5FF;" class="no-sort">
                            <td class="text-center"><b>Total</b></td>
                            <td class="text-center">
                                ${total.clock_in_attempt}
                            </td>
                            <td class="text-center">
                                ${total.clock_in_valid}
                            </td>
                            <td class="text-center">
                                ${total.clock_in_invalid}
                            </td>
                            <td class="text-center">
                                ${total.clock_out_attempt}
                            </td>
                            <td class="text-center">
                                ${total.clock_out_valid}
                            </td>
                            <td class="text-center">
                                ${total.clock_out_invalid}
                            </td>
                        </tr>
                    </tfoot>`);
            }

            if (attendanceTableRows !== '') {
                $('#attendanceTable').DataTable({
                    ...dataTableOptions,
                    buttons: [{
                        extend: 'excelHtml5',
                        text: 'Excel',
                        footer: true,
                        exportOptions: {
                            stripHtml: true,
                            columns: [0, 1, 2, 3, 4, 5, 6]
                        }
                    }, ],
                    "order": [
                        [0, "desc"]
                    ],
                    "fnDrawCallback": function (oSettings) {
                        if ($(
                                '#attendanceTable_wrapper .dataTables_paginate ul li.paginate_button:not(.disabled)'
                            )
                            .length > 1) {
                            $('#attendanceTable_wrapper .dataTables_paginate')[0].style
                                .display = "block";
                        } else {
                            $('#attendanceTable_wrapper .dataTables_paginate')[0].style
                                .display = "none";
                        }
                    }
                });
            }
        }

        function fillTransaction(val) {
            $('#articleTotal').text(parseInt(val.article.total));
            $('#chatTotal').text(val.chat);
            $('#ebookTotal').text(parseInt(val.ebook.total));
            $('#gradeTotal').text(val.grade);
            $('#scheduleTotal').text(val.schedule);

            $('#attendanceTotal').text(parseInt(val.attendance.count));

            let attendanceArr = val.attendance.details;
            let totalObj = val.attendance.total;
            drawTableAttendance(attendanceArr, totalObj);

            $('#permitTotal').text(parseInt(val.permit.total));
            $('#permit .successPermitTotal').text(val.permit.total_success);

            let pemitArr = val.permit.details;
            drawTablePermit(pemitArr);

            let ebookArr = val.ebook.details;
            drawTableEbook(ebookArr);

            let articleArr = val.article.details;
            drawTableArticle(articleArr)
        }

        function ajaxCall(startDate = false, endDate = false) {
            let url = "https://dashboard.skul.id/ajax/get/count";
            if (startDate && endDate) url = `${url}?start_date=${startDate}&end_date=${endDate}`;

            $.ajax({
                url: url,
                beforeSend: function () {
                    spinnerTransaction()
                },
                success: function (res, status, xhr) {
                    if (xhr.status === 200) {
                        let result = res.result;
                        fillTransaction(result);
                    }
                },
                error(res, status) {
                    console.log(res, status)
                }
            })
        };
        // ajaxCall();

        $('.collapse-btn').click(function () {
            let dataTarget = $(this).data('target');

            $('.collapse-btn').removeClass('active');
            $(this).addClass('active');
            $('.collapse-detail').hide();
            $('#' + dataTarget).show();

        });

        $('input[name="datefilter"]').daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Hapus',
                applyLabel: 'Selesai',
                "customRangeLabel": "Pilih manual",
            },
            ranges: {
                'Hari ini': [moment(), moment()],
                'Kemarin': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Bulan ini': [moment().startOf('month'), moment().endOf('month')],
            },
            applyButtonClasses: 's-btn-pink'
        });

        $('input[name="datefilter"]').on('apply.daterangepicker', function (ev, picker) {
            let startDate = picker.startDate;
            let endDate = picker.endDate;
            $(this).val(startDate.format('DD/MM/YYYY') + ' - ' + endDate.format('DD/MM/YYYY'));

            ajaxCall(startDate.format('YYYY/MM/DD'), endDate.format('YYYY/MM/DD'));
        });

        $(document).on('click', '.btn-trigger__export', function (e) {
            e.stopPropagation();
            const target = $(this).data('target');
            $(`.buttons-excel[aria-controls="${target}"]`).trigger('click');
        });
    });

// Example API connectivity check
if (typeof apiFetch === 'function') {
  apiFetch('/status')
    .then(data => console.log('API status', data))
    .catch(err => console.error('API error:', err));
}
