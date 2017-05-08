'use strict';

angular.module('portraitfrancaisApp')
    .directive('draggable', function ($document, $window) {
        return {
            restrict: 'EA',
            scope: {
                dragOptions: '=ngDraggable'
            },
            link: function (scope, elem) {
                var startX, startY, x = 0,
                    y = 0,
                    start, stop, drag, newsletter;

                var width = elem[0].offsetWidth,
                    height = elem[0].offsetHeight;

                // Obtain drag options
                if (scope.dragOptions) {
                    start = scope.dragOptions.start;
                    drag = scope.dragOptions.drag;
                    stop = scope.dragOptions.stop;
                    var id = scope.dragOptions.newsletter;
                    if (id) {
                        newsletter = document.getElementById(id).getBoundingClientRect();
                    }
                }

                // Bind resize event
                function elementInViewport(el) {
                    var top = el.offsetTop;
                    var left = el.offsetLeft;
                    var width = el.offsetWidth;
                    var height = el.offsetHeight;

                    while (el.offsetParent) {
                        el = el.offsetParent;
                        top += el.offsetTop;
                        left += el.offsetLeft;
                    }

                    return (
                        top < (window.pageYOffset + window.innerHeight) &&
                        left < (window.pageXOffset + window.innerWidth) &&
                        (top + height) > window.pageYOffset &&
                        (left + width) > window.pageXOffset
                    );
                }

                var smallWindow = false;

                function winWatcher() {
                    angular.element($window).bind('resize', function () {
                        handleSmallWindow();
                        dontDisapear();
                    });
                }

                function handleSmallWindow() {
                    var news = document.getElementById('newsletter');
                    if (parseInt(window.innerWidth) < 750) {
                        smallWindow = true;
                        news.classList.add('smallWindow');
                        news.removeAttribute('style');
                        scope.$digest();
                    } else {
                        smallWindow = false;
                        news.classList.remove('smallWindow');
                        scope.$digest();
                    }

                }

                function dontDisapear() {
                    var news = document.getElementById('newsletter');

                    if (elementInViewport(news)) {
                        //                        console.log('elementInViewport(news)');
                    } else {
                        news.setAttribute('style', 'right: 20px; top: 7 px;');
                    }
                }
                winWatcher();

                // Bind mousedown event
                elem.on('mousedown', function (e) {
                    if (parseInt(window.innerWidth) >= 750) {
                        //e.preventDefault();
                        startX = e.clientX - elem[0].offsetLeft;
                        startY = e.clientY - elem[0].offsetTop;
                        $document.on('mousemove', mousemove);
                        $document.on('mouseup', mouseup);
                        if (start) {
                            start(e);
                        }
                    }
                });

                // Handle drag event
                function mousemove(e) {
                    y = e.clientY - startY;
                    x = e.clientX - startX;
                    setPosition();
                    if (drag) {
                        drag(e);
                    }
                }

                // Unbind drag events
                function mouseup(e) {
                    $document.unbind('mousemove', mousemove);
                    $document.unbind('mouseup', mouseup);
                    if (stop) {
                        stop(e);
                    }
                }

                // Move element, within newsletter if provided
                function setPosition() {
                    if (newsletter) {
                        if (x < newsletter.left) {
                            x = newsletter.left;
                        } else if (x > newsletter.right - width) {
                            x = newsletter.right - width;
                        }
                        if (y < newsletter.top) {
                            y = newsletter.top;
                        } else if (y > newsletter.bottom - height) {
                            y = newsletter.bottom - height;
                        }
                    }

                    elem.css({
                        top: y + 'px',
                        left: x + 'px'
                    });
                }
            }
        };

    });